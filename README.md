# success-api

### Getting start

Pour pouvoir utiliser cette api vous devez être au prealable un des developpeurs de ce projet afin d'avoir votre propre clé API qu'on utiliseras sous le nom de `API_KEY`. Pour cela veuillez me contacter par WhatsAp au `+237621092130` ou encore via mon addresse email au `Carineteoi@gmail.com`

### usage

Pour utiliser notre mini api pour notre projet de `Success-field`,En developpant la partie front de notre site,vous devez proceder par des requête http.Je me suis battus a ce que notre api respecte le CRUD. Sur ceux, la pluspart des verbes https/http sont accepter.

1-- [POST](#post)<br>
2--[PUT](#put)<br>
3-- [GET](#get)<br>
4-- [DELETE](#delete)<br>
5-- [UPDATE](#update)<br>
6-- ["PATCH"](#patch)<br>

```js
// TOUTE VOS REQUETES DIFFERENTES DU GET,VOUS DEVEZ PRECISER EN HEADER VOTRE CLE API SOIT :
const xhr // pour votre requete http
xhr.setRequestHeader("X-API_KEY","VOTRE CLE API")
```
### Enpoint

## POST

[/post/confirm/email/](#sendmail) Pour envoyer un code de confirmation a un utilisateur
["/post/verify/tel/"](#telvaliditer) Pour tester la validiter d'un numéro de téléphone
["/post/verify/mail/"](#emailvaliditer) Pour verifier si une email est valide
[/post/new_publication](#NewPublicationSocial) pour la creation d'une nouvelle publication

## PUT

["/add_new_comment"](#Add_new_comment) Pour ajouter un nouveau commentaire a une publication dans la base de donnée

## GET

["/publications"](#GettingPublication) Pour recuperer une publiaction ou toutes les publiactions
["/publications/user?profil=???"](#GetUserPublication) Pour recuperer toute les publications d'un utilisateur

## PATCH

["/likes_update/:id"](#/likes_update/:id) Pour liker une publication
["/share_update/:id"](#share_update/:id) pour la mise a jours du nombre de like d(une publication)

### EXEMPLE:

# Add comment_social_network:

## ["Add_new_comment"]:

- REQUEST:<br>

  ```JSON
  {
  "id":23,
  "comment":
  {
     "nom": "Tiger Spark",
     "mess": "Je suis le message que vous souhaiter publier",
     "profil": "Profil-Image-name-of user",
     "heure": "date/ Month-Day-Hours-Minute"
  }
  }
  ```

- RESPONSE:<br>
  ```JSON
  {
  "error": false,
  "msg": "Nouveau commentaire ajouter avec l'id 24",
  }
  ```
- STATUS:
  ~ CORRECT : 202
  ~EROR: orther

# Email Validity :

## ["emailvaliditer"]:

- REQUEST:<br>

  ```JSON
  {
   "email":"il s'agit de l'email dont vous souhaiter verifier la validiter"
  }
  ```

- RESPONSE:

```JSON
 {
 "email":"il s'agit de l'email dont vous souhaiter verifier la validiter",
 "validator":true false
 }
```

- STATUS:<br>
  ~ Correct : 200<br>
  ~ If error: 201,404

$ EXPLICATION:$

```JS
(`Email` est valide) ? `validiter`=true : `validiter`=false
```

# Get Publication:

## ["GettingPublication"]:

Ici, deux cas se presentent a nous : recuperer toutes les publications ou encore recuperer une publication precise.
Mais qu'à cela ne tienne, nous devrons effectuer une même forme de requête.

- REQUEST :

* recuperer toutes les publication

```js
const url = url + "/GettingPublication";
```

- recuperer une publication les publication:

```js
const id = 25; // Id de la publication que vous souhaiter recuperer
const url = url + `/GettingPublication?${id}`;
```

## ["#GetUserPublication"]:

Ici, il est questiion de recuperer les publication d'un utilisateur a travers son profil... Onutilise pour cea le système de Facebook natif cet a dire que les publication de l'utilisateur souhaiter seront afficher y compris ceux des autres utilisateurs ayan le même profil

- REQUEST :

```js
let profil='Profil de l utilisateur souhaiter'
const url=url+"/Publications/user"+profil
```



# Publish_Social_Network :

## ["NewPublicationSocial"]:

- REQUEST :

```JSON
{
	"auth": {
      "nom": "Heu Wang Warano",
      "statut": "online",
      "profil": "abisha.jpg"
    },
	"pub": {
      "type": "image",
      "nom": "joyce.jpg",
      "heure": "6-20-11-30",
      "mess": "Message qui as ete ajouter lors de la publication"
    }
}
```

$EXPLICATIONS:$<br>
$ `NAME`: Represent a name of who publish

$ `Profil`: It's a profil picture name of who publish

$ `Type`: A type of actual publication. Image,Videos or Typing

$ `Name`: A name of a image or videos that published

$ `Date`: A date of publication whith a format \_Moth-Day-Hours-Minutes $

<br>

- RESPONSE:

```json
{
  "error": false,
  "msg": "Publication ajouter avec success"
}
```

- STATUS :<br>
  $Correct: 201
$If Error :406


# send_mail :

## ["sendmail"]:

- REQUEST :

```Json
{
	"API_KEY":"Your API_KeY",
	"object":"Confirm_mail",
	"email":"lidsaylida@gmail.com"
}
```

- RESPONSE :<br>

```JSON
  {
  "error":false,
  "msg":"Code envoyé avec succèss a L'email mentioner",
  "code": "Code qui a ete envoyer a l'email mentioner"
  }
```

- STATUS:
  ~ Correct : 201
  ~ If error : 401, 400,422

🚨🚨` Si un des code status suivant est obtenue alors veuillez vous fier au message qui en suit`.🚨🚨

- `EMAIL`: il s'agit de l'email de la personne qui doit recevoir l'email
- `KEY`: Vous devez la remplacer par votre Clé api
- `Code`: The code tha's send

# tel_validiter :

## ["telvaliditer"]:

- REQUEST:<br>

  ```JSON
  {
   "tel":"Tel"
  }
  ```

- RESPONSE
  {
  email:Tel,
  validator:boolean
  }
- STATUS:<br>
  ~ Correct : 200 <br>
  ~ If error: 201,404

- `Tel`: il s'agit du numeros de téléphone
  dont vous souhaiter verifier la validiter

```JAVASCRIPT
(`Tel` est valide) ? `validiter`=true : `validiter`=false
```

## ["/likes_update/:id"]: publication
