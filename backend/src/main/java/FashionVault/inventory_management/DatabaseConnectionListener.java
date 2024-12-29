package FashionVault.inventory_management;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseConnectionListener {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseConnectionListener.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @EventListener(ApplicationReadyEvent.class)
    public void checkDatabaseConnection() {
        try {
            // Run a simple query to test the connection
            jdbcTemplate.execute("SELECT 1");
            logger.info("✅ Successfully connected to the database!");
        } catch (Exception e) {
            logger.error("❌ Failed to connect to the database: {}", e.getMessage());
        }
    }
}
