# Labor 5

# 1. Erweitern der Laborumgebung

## 1.1 GitHub – Repository und Webstorm

(1) kostenfreier Account wurde auf GitHub erstellt
(2) Personal Access Token wurde unter dem GitHub-Account generiert
(3) Share Project on GitHub
(4) Projektdaten wurden hochgeladen

## 1.2 NodeJS - Webserver
Anstelle des empfohlenen Setups von NodeJS auf Ubuntu wurde Windows genommen.

```shell
winget install -e --id OpenJS.NodeJS

node -v
```
Das NodeJS packet enthält außerdem den Node Package Manager (npm)

Neben winget kann auch über einen Installer NodeJS installiert werden.
Link: https://nodejs.org/dist/v22.13.0/node-v22.13.0-x64.msi

# 2. Erstellen von dynamischen Webseiten

NodeJS Bibliotheken:
```shell
npm install express body-parser fs
```