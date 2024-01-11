// Libraries
import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

/**
 * The goal of this component is to provide a modal form for adding or editing a website. 
 */
function FormWebsite({ isOpen, toggle, onSave, title, activeItem }) {
    const [item, setItem] = useState(activeItem);

    function handleChange(e) {
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    }

    function validateForm() {
        return onSave(item);
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nom">Nom</Label>
                        <Input
                            type="text"
                            name="nom"
                            value={item.nom}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="url">Url</Label>
                        <Input
                            type="text"
                            name="url"
                            value={item.url}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="image_url">URL Image</Label>
                        <Input
                            type="text"
                            name="image_url"
                            value={item.image_url}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => validateForm()}>
                    Enregistrer
                </Button>
            </ModalFooter>
        </Modal>
    );
}

// Exportation
export default FormWebsite;
