DELIMITER $$

DROP TRIGGER `contents_logs`$$

CREATE TRIGGER `contents_logs` BEFORE UPDATE on `contents`
FOR EACH ROW
BEGIN
    IF (NEW.name != OLD.name) THEN
        INSERT INTO contents_logs 
            (`contents_id` , `log` , `created_by`)
        VALUES 
            (NEW.id, CONCAT("Name was changed from ",OLD.name," to ",NEW.name), 1);
    END IF;
    IF (NEW.details != OLD.details) THEN
        INSERT INTO contents_logs 
            (`contents_id` , `log` , `created_by`)
        VALUES 
            (NEW.id, CONCAT("Content was changed from ",OLD.details," to ",NEW.details), 1);
    END IF;
    IF (NEW.field_type != OLD.field_type) THEN
        INSERT INTO contents_logs 
            (`contents_id` , `log` , `created_by`)
        VALUES 
            (NEW.id, CONCAT("Field Type was changed from ",OLD.field_type," to ",NEW.field_type), 1);
    END IF;
END$$

DELIMITER ;