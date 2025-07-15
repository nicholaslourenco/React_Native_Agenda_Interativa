/* eslint-disable prettier/prettier */
import React from 'react';

// Páginas e Serviços
import Home from '../components/Home';
import Teste from '../components/TesteCad';
import TesteRec from '../components/TesteCadRec';
import EditTarefa from '../components/EditTarefa';
import ListaFunction from '../components/Listagem';
import EditRecompensa from '../components/EditRecompensa';

// Bibliotecas
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackNavigator() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#6410BA',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: '#ffffff',
                },
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cadastro de Tarefa" component={Teste} />
            <Stack.Screen name="Cadastro de Recompensa" component={TesteRec} />
            <Stack.Screen name="Lista Diária" component={ListaFunction} />
            <Stack.Screen name="Editar Tarefa" component={EditTarefa} />
            <Stack.Screen name="Editar Recompensa" component={EditRecompensa} />
        </Stack.Navigator>
    );

}
