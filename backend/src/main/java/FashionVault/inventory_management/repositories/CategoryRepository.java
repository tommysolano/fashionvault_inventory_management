package FashionVault.inventory_management.repositories;

import FashionVault.inventory_management.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Custom queries (if needed) can be defined here
}
