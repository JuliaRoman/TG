import React, {Component} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BuscaIngrediente(){

    const navigation = useNavigation();

    function handleReceita() {
        navigation.navigate('Receita');
    }

    return (
        <SafeAreaView>
            <Image style={styles.imgTitulo} source={require('../../assets/img_busca_por_nome.png')} />
            <TextInput style = {styles.input} placeholder="Insira um ingrediente" />
            <Text style = {styles.button} onPress={handleReceita}>Buscar</Text>
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
    button: {
        backgroundColor: '#E7320E',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        borderRadius: 50,
        height: 50,
        marginLeft: 50,
        marginBottom: 5,
        marginRight: 50,
        paddingTop: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

