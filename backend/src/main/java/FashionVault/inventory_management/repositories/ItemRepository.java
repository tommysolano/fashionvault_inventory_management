package FashionVault.inventory_management.repositories;

import FashionVault.inventory_management.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByDeletedFalse();
}