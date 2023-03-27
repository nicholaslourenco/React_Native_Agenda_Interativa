/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { forms } from '../styles';
import Database from '../databaseS/database';
import Recompensa from '../models/recompensa';

const db = new Database();

export default function EditRecompensa({ route, navigation }) {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    
    useEffect(() => {
        setId(route.params.id);
        setNome(route.params.nome);
        setDescricao(route.params.descricao);
    }, []);

    let editar = (id, nome, descricao) => {
        const recEditada = new Recompensa(nome, descricao);
        db.EdicaoRec(id, recEditada);
        navigation.navigate('Home');
        //ToastAndroid.show("Recompensa editada com sucesso", ToastAndroid.SHORT);
    }

    return (
        <ScrollView>
            <Text style={forms.titulo}>Edição de Recompensa</Text>
            <Text />
            <Text style={forms.text}>Nome da Recompensa</Text>
            <TextInput
                style={forms.textInputRec}
                value={nome}
                onChangeText={
                    (text) => setNome(text)
                }
            />
            <Text />
            <Text style={forms.text}>Descrição da Recompensa</Text>
            <TextInput
                style={forms.textInputRec}
                value={descricao}
                onChangeText={
                    (text) => setDescricao(text)
                }
                multiline={true}
                numberOfLines={4}
            />
            <Text />
            <TouchableOpacity
                style={forms.btnCadRecompensas}
                onPress={() => editar(
                    id,
                    nome,
                    descricao
                )
                }
            >
                <Text style={forms.btnRecompensasText}>Editar Recompensa</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

