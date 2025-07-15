/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'SQLite.db';
const database_version = '1.0';
const database_displayname = 'AppRecompensa';
const database_size = 200000;

export default class Database {

    Conectar() {
        let db;
        return new Promise((resolve) => {
            console.log('Checando a integridade do plugin ...');
            SQLite.echoTest().then(() => {
                console.log('Integridade Ok ...');
                console.log('Abrindo Banco de Dados ...');
                SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then(DB => {
                    db = DB;
                    console.log('Banco de dados Aberto');
                    db.executeSql('SELECT 1 FROM Tarefas LIMIT 1').then(() => {
                        console.log('O banco de dados está pronto ... Executando Consulta SQL ...');
                    }).catch((error) => {
                        console.log('Erro Recebido: ', error);
                        console.log('O Banco de dados não está pronto ... Criando Dados');
                        db.transaction((tx) => {
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Tarefas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(20), descricao varchar(300), prioridade varchar(20), horaCompleta varchar(30), horaFormatada varchar(30), concluido varchar(20), notifId varchar(10))');
                            tx.executeSql('CREATE TABLE IF NOT EXISTS Recompensas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome varchar(20), descricao varchar(300))');
                        }).then(() => {
                            console.log('Tabelas criadas com Sucesso');
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    resolve(db);
                }).catch(error => {
                    console.log(error);
                });
            }).catch(error => {
                console.log('echoTest Falhou - plugin não funcional');
            });
        });
    }

    Desconectar(db) {
        if (db) {
            console.log('Fechando Banco de Dados');
            db.close().then(status => {
                console.log('Banco de dados Desconectado!!');
            }).catch(error => {
                this.errorCB(error);
            });
        } else {
            console.log('A conexão com o banco não está aberta');
        }
    }

    // Operações CRUD

    // Listar

    Listar() {
        return new Promise((resolve) => {
            const lista = [];
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Tarefas', []).then(([tx, results]) => {
                        console.log('Consulta completa');
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id, nome, descricao, prioridade, horaCompleta, horaFormatada, concluido, notifId } = row;
                            lista.push({ id, nome, descricao, prioridade, horaCompleta, horaFormatada, concluido, notifId });
                        }
                        console.log(lista);
                        resolve(lista);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    ListarQuantidade() {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Tarefas', []).then(([tx, results]) => {
                        console.log('Consulta completa');
                        var len = results.rows.length;
                        console.log(len);
                        resolve(len);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    ListarConcluidas() {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Tarefas WHERE concluido="Concluida"', []).then(([tx, results]) => {
                        console.log('Consulta completa');
                        var len = results.rows.length;
                        console.log(len);
                        resolve(len);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    // Adicionar

    Adicionar(item) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para inserir uma nova tarefa
                    tx.executeSql('INSERT INTO Tarefas (nome, descricao, prioridade, horaCompleta, horaFormatada, concluido, notifId) VALUES (?, ?, ?, ?, ?, ?, ?)', [item.nome, item.descricao, item.prioridade, item.horaCompleta, item.horaFormatada, item.concluido, item.notifId]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    // Atualizar

    EdicaoConcluido(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados
                    tx.executeSql('UPDATE Tarefas SET concluido="Concluida" WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    Edicao(id, tarefaEditada) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados
                    tx.executeSql('UPDATE Tarefas SET nome = ?, descricao = ?, prioridade = ?, horaCompleta = ?, horaFormatada = ?, concluido = ?, notifId = ? WHERE id = ?', [tarefaEditada.nome, tarefaEditada.descricao, tarefaEditada.prioridade, tarefaEditada.horaCompleta, tarefaEditada.horaFormatada, tarefaEditada.concluido, tarefaEditada.notifId, id]).then(([tx, results]) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert('Tarefa editada com sucesso')
                        } else Alert.alert('Erro ao editar tarefa');
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    EdicaoCriarNotif(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE Tarefas SET notifId = "1" WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert('Tarefa editada com sucesso')
                        } else Alert.alert('Erro ao editar tarefa');
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    EdicaoCancelNotif(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados
                    tx.executeSql('UPDATE Tarefas SET notifId = "0" WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert('Tarefa editada com sucesso')
                        } else Alert.alert('Erro ao editar tarefa');
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    // Deletar

    Deletar(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados
                    tx.executeSql('DELETE FROM Tarefas WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


    //Operações para tabela Recompensas


    // Operações CRUD

    // Listar

    ListarRec() {
        return new Promise((resolve) => {
            const lista = [];
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('SELECT * FROM Recompensas', []).then(([tx, results]) => {
                        console.log('Consulta completa');
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            const { id, nome, descricao } = row;
                            lista.push({ id, nome, descricao });
                        }
                        console.log(lista);
                        resolve(lista);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    // Adicionar

    AdicionarRec(item) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para inserir uma nova tarefa
                    tx.executeSql('INSERT INTO Recompensas (nome, descricao) VALUES (?, ?)', [item.nome, item.descricao]).then(([tx, results]) => {
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    // Atualizar

    EdicaoRec(id, recEditada) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    tx.executeSql('UPDATE Recompensas SET nome = ?, descricao = ? WHERE id = ?', [recEditada.nome, recEditada.descricao, id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    // Deletar

    DeletarRec(id) {
        return new Promise((resolve) => {
            this.Conectar().then((db) => {
                db.transaction((tx) => {
                    //Query SQL para deletar um item da base de dados
                    tx.executeSql('DELETE FROM Recompensas WHERE id = ?', [id]).then(([tx, results]) => {
                        console.log(results);
                        resolve(results);
                    });
                }).then((result) => {
                    this.Desconectar(db);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }


}
