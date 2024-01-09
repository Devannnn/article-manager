// Bibliothèques
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
 * Le rôle de ce composant est d'afficher un formulaire pour rentrer des informations sur un enseignant.
 * Il est utilisé aussi bien pour ajouter un nouvel enseignant que pour modifier un enseignant existant.
 */
function FormArticle({ isOpen, toggle, onSave, title }) {
    const [item, setItem] = useState({});

    function handleChange(e) {
        let { name, value } = e.target;
        const newItem = { ...item, [name]: value };
        setItem(newItem);
    }

    function validateForm() {
        console.log(item);
        return onSave(item);
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="titre">Titre</Label>
                        <Input
                            type="text"
                            name="titre"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="auteur">Auteur</Label>
                        <Input
                            type="text"
                            name="auteur"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="url_site">Url Site</Label>
                        <Input
                            type="text"
                            name="url_site"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input
                            type="text"
                            name="date"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="synopsis">Synopsis</Label>
                        <Input
                            type="text"
                            name="synopsis"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="url_article">Url Article</Label>
                        <Input
                            type="text"
                            name="url_article"
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

export default FormArticle;
