package dev.vitto.gipcat.repository;

import dev.vitto.gipcat.model.ContactInformationType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactInformationTypeRepository extends JpaRepository<ContactInformationType, Integer> {
}
