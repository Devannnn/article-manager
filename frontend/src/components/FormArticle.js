import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

function FormArticle({ isOpen, toggleModal }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Ajoutez le traitement de la soumission du formulaire ici si nécessaire
        toggleModal(); // Fermer le modal après la soumission
    };

    return (
        <Modal isOpen={isOpen} toggle={toggleModal}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalHeader toggle={toggleModal}>Ajouter un article</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="titre">Titre</Label>
                        <Input {...register('titre', { required: true })} />
                        {errors.titre && <FormFeedback>Un titre est requis.</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="auteur">Auteur</Label>
                        <Input {...register('auteur', { required: true })} />
                        {errors.auteur && <FormFeedback>Un auteur est requis.</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="url_site">Url site</Label>
                        <Input {...register('url_site', { required: true })} />
                        {errors.url_site && <FormFeedback>L'URL du site est requis.</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="url_article">Url article</Label>
                        <Input {...register('url_article', { required: true })} />
                        {errors.url_article && <FormFeedback>L'URL de l'article est requis.</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="date">Année de l'article</Label>
                        <Input {...register('date', { required: true })} />
                        {errors.date && <FormFeedback>L'année de l'article est requis.</FormFeedback>}
                    </FormGroup>

                    <FormGroup>
                        <Label for="synopsis">Synopsis</Label>
                        <Input {...register('synopsis', { required: true })} />
                        {errors.synopsis && <FormFeedback>Un synopsis de l'article est requis.</FormFeedback>}
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary">
                        Envoyer
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                        Annuler
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default FormArticle;
