import React, {Component} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView } from 'react-native';

import Button from '../componentes/Button';

export default function BuscaNome(){

    return (
        <SafeAreaView>
            <Image style={styles.imgTitulo} source={require('../../assets/img_busca_por_nome.png')} />
            <TextInput style = {styles.input} placeholder="Insira o nome da receita" />
            <Button title="Buscar" />
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor: '#5B5B5B',
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
        fontSize: 16,
        paddingStart: 20,
        color: '#5B5B5B',
        borderRadius: 50,
        height: 50,
    },
    imgTitulo:{
        alignSelf:'center',
        marginTop:100,
        marginBottom:50,
        width:292,
    },
});

