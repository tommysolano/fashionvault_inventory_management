package FashionVault.inventory_management.repositories;

import FashionVault.inventory_management.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    // Custom queries (if needed) can be defined here
}
