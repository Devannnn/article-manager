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
import FetchData from "./FetchData";
import { getTagsURL } from "./Urls";

/**
 * The goal of this component is to provide a modal form for adding or editing an article. 
 */
function FormArticle({ isOpen, toggle, onSave, title }) {
    const [item, setItem] = useState({});
    const API_URL_TAGS = getTagsURL();
    const { data: tags } = FetchData(API_URL_TAGS);

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "tags") {
            const selectedTags = Array.from(e.target.selectedOptions, (option) =>
                JSON.parse(option.value)
            );
            setItem((prevItem) => ({ ...prevItem, [name]: selectedTags }));
        } else {
            setItem((prevItem) => ({ ...prevItem, [name]: value }));
        }
    }

    function validateForm() {
        console.log(item);
        return onSave(item);
    }

    function generateOptionsTags() {
        return tags.map((tag) => (
            <option key={tag.id} value={JSON.stringify(tag)}>
                {tag.nom}
            </option>
        ));
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
                    <FormGroup>
                        <Label for="exampleSelect">
                            Choix des tags
                        </Label>
                        <Input
                            type="select"
                            name="tags"
                            multiple
                            onChange={handleChange}
                        >
                            {generateOptionsTags()}
                        </Input>
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
export default FormArticle;
