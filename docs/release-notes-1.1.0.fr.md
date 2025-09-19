# Version 1.1.0

## Vue d’ensemble

- Cette fonctionnalité vous permet de revenir à votre position d’origine en un seul clic après avoir envoyé une question à l’IA ou appuyé sur le bouton de défilement lors de l’utilisation de ChatGPT. Lorsque vous relisez vos anciens journaux de conversation et que vous souhaitez poser une question, vous n’avez plus besoin de rechercher à nouveau l’endroit où vous étiez. Après avoir vu la réponse de l’IA, si une nouvelle question vous vient à l’esprit, pas de souci ! En quelques clics, vous pouvez toujours revenir à votre position initiale.

## Points forts

- Retour en un clic ou via raccourci clavier sur les pages ChatGPT
- Comportement simple de l’icône (ON = couleur, OFF = gris)
- Interface multilingue (en/ja/zh-CN/es/pt-BR/ko/de/fr/hi)
- Aucune analyse ; les paramètres ON/OFF sont enregistrés uniquement localement

## Raccourcis

- Alt+J (Alt+Shift+J sur Mac) — configurable dans chrome://extensions/shortcuts

## Autorisations

- contextMenus, tabs, storage, scripting (utilisé uniquement pour l’injection dans les onglets existants)

## Modifications

### v1.1.0
- Extension de la fonctionnalité permettant de revenir de façon répétée à des positions antérieures sur la page, et pas seulement à la plus récente.

### v1.0.2
- GIF de démonstration dans le README corrigé/mis à jour.
- Le lien du menu d’information ouvre désormais le Chrome Web Store en JA/EN selon la langue du navigateur.

### v1.0.1
- Avertissement d’utilisation ajouté dans le README
  (précisant qu’il s’agit d’un outil non officiel, non affilié à OpenAI, à utiliser à vos risques, et fonctionnant uniquement sur le DOM visible)
- Correction d’une condition de concurrence dans la création du menu contextuel

## Liens
- README (Anglais): https://github.com/wanyakomochimochi/ChatGPTJumpBack#readme (English)
- Journal des modifications: https://github.com/wanyakomochimochi/ChatGPTJumpBack/blob/main/CHANGELOG.md (English)
- Dépôt: https://github.com/wanyakomochimochi/ChatGPTJumpBack (English)
