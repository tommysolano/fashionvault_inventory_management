package FashionVault.inventory_management.repositories;

import FashionVault.inventory_management.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    // Custom queries (if needed) can be defined here
}