package FashionVault.inventory_management;

import FashionVault.inventory_management.entities.Category;
import FashionVault.inventory_management.entities.Item;
import FashionVault.inventory_management.entities.Transaction;

import FashionVault.inventory_management.repositories.CategoryRepository;
import FashionVault.inventory_management.repositories.ItemRepository;
import FashionVault.inventory_management.repositories.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your frontend
public class MainController {

    // CATEGORY ENDPOINTS

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(category -> ResponseEntity.ok().body(category))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category updatedCategory) {
        return categoryRepository.findById(id)
                .map(category -> {
                    category.setName(updatedCategory.getName());
                    category.setDescription(updatedCategory.getDescription());
                    return ResponseEntity.ok(categoryRepository.save(category));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(category -> {
                    // Break the association between category and items
                    category.getItems().forEach(item -> {
                        item.setCategory(null); // Remove the association
                        itemRepository.save(item); // Save the updated item
                    });

                    // Delete the category
                    categoryRepository.delete(category);

                    // Explicitly specify the type parameter as Void
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ITEM ENDPOINTS

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemRepository.findAll().stream()
                .filter(item -> !item.isDeleted()) // Exclude deleted items
                .toList();
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemRepository.findById(id)
                .map(item -> ResponseEntity.ok().body(item))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/items")
    public Item addItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(updatedItem.getName());
                    item.setDescription(updatedItem.getDescription());
                    item.setPurchasePrice(updatedItem.getPurchasePrice());
                    item.setSalePrice(updatedItem.getSalePrice());
                    item.setQuantity(updatedItem.getQuantity());
                    item.setSize(updatedItem.getSize());
                    item.setColor(updatedItem.getColor());
                    item.setCategory(updatedItem.getCategory());
                    item.setUpdatedAt(updatedItem.getUpdatedAt());
                    return ResponseEntity.ok(itemRepository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            item.setDeleted(true); // Logically mark the item as deleted
            itemRepository.save(item); // Save the changes
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // TRANSACTIONS ENDPOINTS

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @PostMapping("/transactions")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        return itemRepository.findById(transaction.getItem().getId())
                .filter(item -> !item.isDeleted()) // Ensure the item is not marked as deleted
                .map(item -> {
                    if (transaction.getType() == Transaction.TransactionType.SALE &&
                            item.getQuantity() < transaction.getQuantity()) {
                        return ResponseEntity.badRequest().<Transaction>build(); // Explicitly type the bad request
                    }

                    // Adjust stock based on transaction type
                    if (transaction.getType() == Transaction.TransactionType.SALE) {
                        item.setQuantity(item.getQuantity() - transaction.getQuantity());
                    } else if (transaction.getType() == Transaction.TransactionType.PURCHASE) {
                        item.setQuantity(item.getQuantity() + transaction.getQuantity());
                    }

                    // Save updated item stock
                    itemRepository.save(item);

                    // Calculate transaction details
                    BigDecimal unitPrice = transaction.getType() == Transaction.TransactionType.PURCHASE
                            ? item.getPurchasePrice()
                            : item.getSalePrice();

                    transaction.setUnitPrice(unitPrice);
                    transaction.setTotalValue(unitPrice.multiply(new BigDecimal(transaction.getQuantity())));

                    return ResponseEntity.ok(transactionRepository.save(transaction));
                })
                .orElse(ResponseEntity.badRequest().<Transaction>build()); // Explicitly type the bad request
    }

    @PutMapping("/transactions/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id,
            @RequestBody Transaction updatedTransaction) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    System.out.println("Incoming transaction ID: " + id);
                    System.out.println("Incoming transactionDate: " + updatedTransaction.getTransactionDate());
                    System.out.println("Incoming type: " + updatedTransaction.getType());
                    System.out.println("Incoming quantity: " + updatedTransaction.getQuantity());

                    // Fetch the current item and validate
                    Item currentItem = transaction.getItem();
                    if (currentItem == null || currentItem.getQuantity() == null) {
                        System.out.println("Invalid current item or quantity");
                        return ResponseEntity.badRequest().<Transaction>build();
                    }
                    System.out.println("Current item quantity: " + currentItem.getQuantity());

                    // Reverse the previous transaction's effect on stock
                    if (transaction.getType() == Transaction.TransactionType.SALE) {
                        currentItem.setQuantity(currentItem.getQuantity() + transaction.getQuantity());
                    } else if (transaction.getType() == Transaction.TransactionType.PURCHASE) {
                        currentItem.setQuantity(currentItem.getQuantity() - transaction.getQuantity());
                    }
                    System.out.println(
                            "Adjusted stock after reversing previous transaction: " + currentItem.getQuantity());
                    itemRepository.save(currentItem);

                    // Validate and adjust stock for the new transaction
                    if (updatedTransaction.getType() == Transaction.TransactionType.SALE &&
                            currentItem.getQuantity() < updatedTransaction.getQuantity()) {
                        System.out.println("Insufficient stock for SALE");
                        return ResponseEntity.badRequest().<Transaction>build();
                    }

                    // Apply the new transaction's effect on stock
                    if (updatedTransaction.getType() == Transaction.TransactionType.SALE) {
                        currentItem.setQuantity(currentItem.getQuantity() - updatedTransaction.getQuantity());
                    } else if (updatedTransaction.getType() == Transaction.TransactionType.PURCHASE) {
                        currentItem.setQuantity(currentItem.getQuantity() + updatedTransaction.getQuantity());
                    }
                    System.out.println("Adjusted stock after applying new transaction: " + currentItem.getQuantity());
                    itemRepository.save(currentItem);

                    // Update transaction details
                    transaction.setType(updatedTransaction.getType());
                    transaction.setQuantity(updatedTransaction.getQuantity());
                    transaction.setNotes(updatedTransaction.getNotes());
                    transaction.setTransactionDate(updatedTransaction.getTransactionDate());

                    BigDecimal unitPrice = updatedTransaction.getType() == Transaction.TransactionType.PURCHASE
                            ? currentItem.getPurchasePrice()
                            : currentItem.getSalePrice();

                    transaction.setUnitPrice(unitPrice);
                    transaction.setTotalValue(unitPrice.multiply(new BigDecimal(updatedTransaction.getQuantity())));

                    return ResponseEntity.ok(transactionRepository.save(transaction));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/categories/{id}/items")
    public ResponseEntity<List<Item>> getItemsByCategory(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(category -> ResponseEntity.ok(category.getItems()))
                .orElse(ResponseEntity.notFound().build());
    }
}
