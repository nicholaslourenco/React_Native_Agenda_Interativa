/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, ToastAndroid, TextInput, TouchableOpacity, ScrollView } from 'react-native';

// Páginas e Serviços
import { forms } from '../styles';
import Database from '../databaseS/database';
import Recompensa from '../models/recompensa';

export default function TesteRec({ navigation }) {

    // Criação dos States
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    // Funções anõnimas para chamada dos métodos

    let cadastrarRec = (nome, descricao) => {
        const db = new Database();
        const novaRecompensa = new Recompensa(nome, descricao);
        db.AdicionarRec(novaRecompensa);
        ToastAndroid.show("Recompensa criada", ToastAndroid.SHORT);
        navigation.navigate('Home');
    };

    return (
        <ScrollView>
            <Text style={forms.titulo}>Cadastrar Recompensa</Text>
            <Text />
            <Text style={forms.text}>Nome da Recompensa</Text>
            <TextInput
                style={forms.textInputRec}
                onChangeText={
                    (text) => setNome(text)
                }
            />
            <Text />
            <Text style={forms.text}>Descrição da Recompensa</Text>
            <TextInput
                style={forms.textInputRec}
                onChangeText={
                    (text) => setDescricao(text)
                }
                multiline={true}
                numberOfLines={4}
            />
            <Text />
            <TouchableOpacity
                style={forms.btnCadRecompensas}
                onPress={() => cadastrarRec(
                    nome,
                    descricao
                )
                }
            >
                <Text style={forms.btnRecompensasText}>Cadastrar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
