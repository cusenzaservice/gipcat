package dev.vitto.gipcat.controller;

import dev.vitto.gipcat.model.ContactInformationType;
import dev.vitto.gipcat.repository.ContactInformationTypeRepository;
import dev.vitto.gipcat.service.ContactInformationTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/contactInformationTypes")
public class ContactInformationTypeController {

    @Autowired
    ContactInformationTypeService contactInformationTypeService;

    @GetMapping("")
    public List<ContactInformationType> list() {
        return contactInformationTypeService.listAllContactInformationType();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactInformationType> get(@PathVariable Integer id) {
        try {
            ContactInformationType cit = contactInformationTypeService.getContactInformationType(id);
            return new ResponseEntity<>(cit, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public void add(@RequestBody ContactInformationType cit) {
        contactInformationTypeService.saveContactInformationType(cit);
    }

    // no update method

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        contactInformationTypeService.deleteContactInformationType(id);
    }

}
