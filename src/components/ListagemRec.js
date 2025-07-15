/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

// Bibliotecas
import Icon from 'react-native-vector-icons/Ionicons';
import MyIcon from 'react-native-vector-icons/MaterialIcons';

// Páginas e Serviços
import { listaDeRecompensas } from '../styles/index';
import Database from '../databaseS/database';

export default class ListagemRec extends Component {

    // States
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nome: '',
            descricao: '',
            lista: [],
        };

        this.ListagensRec();
    }

    // Funções anõnimas para chamada dos métodos
    TestarConexao = () => {
        const db = new Database();
        db.Conectar();
        this.ListagensRec();
    };

    DeleteRec = (id) => {
        const db = new Database();
        db.DeletarRec(id);
        this.ListagensRec();
    }

    ListagensRec = () => {
        const db = new Database();
        db.ListarRec().then(data => {
            this.setState({ lista: data });
        });
    };

    render() {

        const { navegacao } = this.props;

        return (
            <View>
                <Text style={listaDeRecompensas.titulo}>Listagem de Recompensas</Text>
                {
                    this.state.lista.map(
                        item => (
                            <View key={item.id} style={listaDeRecompensas.viewLista}>
                                <Text style={listaDeRecompensas.textLista}>Nome da Recompensa: {item.nome}</Text>
                                <Text style={listaDeRecompensas.textLista}>Descrição: {item.descricao}</Text>
                                <View style={listaDeRecompensas.viewBtn}>
                                    <TouchableOpacity
                                        style={listaDeRecompensas.btnEditar}
                                        onPress={() => navegacao.navigate('Editar Recompensa', {
                                            id: item.id,
                                            nome: item.nome,
                                            descricao: item.descricao
                                        })}
                                    >
                                        <MyIcon name="edit" size={30} color="#ffffff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={listaDeRecompensas.btnExcluir} onPress={() => this.DeleteRec(item.id)}>
                                        <Icon name="trash" size={30} color="#ffffff" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    )
                }
            </View>
        );
    }
}
