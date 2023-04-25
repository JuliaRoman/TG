import {db} from "./AbrirConexao";

function criaTabela(){
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT);" +
           "CREATE TABLE IF NOT EXISTS usuario_restricao (id_usuario_restricao INTEGER PRIMARY KEY AUTOINCREMENT, fk_usuario INTEGER NOT NULL, fk_restricao INTEGER NOT NULL);" +
           "CREATE TABLE IF NOT EXISTS Usuario (id_restricao INTEGER PRIMARY KEY AUTOINCREMENT, nome_restricao TEXT NOT NULL);");
    });
}