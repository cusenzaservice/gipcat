package dev.vitto.gipcat.model;

import javax.persistence.*;

@Entity
@Table(name = "contact_information_type")
public class ContactInformationType {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id_contact_information_type")
    private Integer idContactInformationType;

    @Column(name = "contact_information_type")
    private String contactInformationType;

    @Column(name = "html_encapsulation")
    private String htmlEncapsulation;

    public Integer getIdContactInformationType() {
        return this.idContactInformationType;
    }

    public void setIdContactInformationType(Integer idContactInformationType) {
        this.idContactInformationType = idContactInformationType;
    }

    public String getContactInformationType() {
        return this.contactInformationType;
    }

    public void setContactInformationType(String contactInformationType) {
        this.contactInformationType = contactInformationType;
    }

    public String getHtmlEncapsulation() {
        return this.htmlEncapsulation;
    }

    public void setHtmlEncapsulation(String htmlEncapsulation) {
        this.htmlEncapsulation = htmlEncapsulation;
    }
}
