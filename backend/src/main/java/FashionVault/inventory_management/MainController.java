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

import java.util.List;

@RestController
@RequestMapping("/api")
public class MainController {

    // CATEGORY ENDPOINTS

    @Autowired
    private CategoryRepository categoryRepository;

    // Endpoint: Get all categories
    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Endpoint: Add a new category
    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    // Endpoint: Update a category
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

    // Endpoint: Delete a category
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ITEM ENDPOINTS

    @Autowired
    private ItemRepository itemRepository;

    // Endpoint: Get all items
    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Endpoint: Add a new item
    @PostMapping("/items")
    public Item addItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    // Endpoint: Update an item
    @PutMapping("/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(updatedItem.getName());
                    item.setDescription(updatedItem.getDescription());
                    item.setPrice(updatedItem.getPrice());
                    item.setQuantity(updatedItem.getQuantity());
                    item.setSize(updatedItem.getSize());
                    item.setColor(updatedItem.getColor());
                    item.setCategory(updatedItem.getCategory());
                    item.setUpdatedAt(updatedItem.getUpdatedAt());
                    return ResponseEntity.ok(itemRepository.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint: Delete an item
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // TRANSACTIONS ENDPOINTS

    @Autowired
    private TransactionRepository transactionRepository;

    // Endpoint: Get all transactions
    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // Endpoint: Add a new transaction
    @PostMapping("/transactions")
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        return ResponseEntity.ok(transactionRepository.save(transaction));
    }

    // Endpoint: Update a transaction
    @PutMapping("/transactions/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id,
            @RequestBody Transaction updatedTransaction) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    transaction.setItem(updatedTransaction.getItem());
                    transaction.setType(updatedTransaction.getType());
                    transaction.setQuantity(updatedTransaction.getQuantity());
                    transaction.setNotes(updatedTransaction.getNotes());
                    return ResponseEntity.ok(transactionRepository.save(transaction));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint: Delete a transaction
    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        if (transactionRepository.existsById(id)) {
            transactionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Fetch all items in a specific category
    @GetMapping("/categories/{id}/items")
    public ResponseEntity<List<Item>> getItemsByCategory(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(category -> {
                    List<Item> items = category.getItems(); // Assuming a `List<Item>` in Category
                    return ResponseEntity.ok(items);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
