package dev.vitto.gipcat.service;

import dev.vitto.gipcat.model.ContactInformationType;
import dev.vitto.gipcat.repository.ContactInformationTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ContactInformationTypeService {

    @Autowired
    private ContactInformationTypeRepository contactInformationTypeRepository;

    public List<ContactInformationType> listAllContactInformationType() {
        return contactInformationTypeRepository.findAll();
    }

    public void saveContactInformationType(ContactInformationType cit){
        contactInformationTypeRepository.save(cit);
    }

    public ContactInformationType getContactInformationType(Integer id){
        return contactInformationTypeRepository.findById(id).get();
    }

    public void deleteContactInformationType(Integer id){
        contactInformationTypeRepository.deleteById(id);
    }
}
