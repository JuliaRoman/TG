import React from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro(){

    const navigation = useNavigation();

    function handleBuscaNome() {
        navigation.navigate('Busca por nome');
    }

    function handleInicial() {
        navigation.navigate('Inicial');
    }

    function adicionarTag(){
        Alert.alert('Categoria selecionada');
    }
  
    return (
        
        <SafeAreaView>
            <View style = {styles.voltar}>
                <Text style = {styles.mensagem}>Já possui conta?</Text>
                <Text style = {[styles.mensagem, styles.cadastrar]} onPress={handleInicial} >Acessar!</Text>
            </View>
            <TextInput style = {styles.input} placeholder="Insira seu nome" />
            <TextInput style = {styles.input} placeholder="Insira seu e-mail" />
            <TextInput secureTextEntry={true} style = {styles.input} placeholder="Insira uma nova senha" />
            <TextInput secureTextEntry={true} style = {styles.input} placeholder="Confirme sua senha" />
            <Text style = {styles.chamada}>Possui alguma restrição ou dieta alimentar?</Text>
            <View style = {styles.restricoes}>
                <View style = {styles.flex}>
                    <Text style = {styles.tags} onPress={adicionarTag}>Intolerância a glúten</Text>
                    <Text style = {[styles.tags, styles.tagMenor]} onPress={adicionarTag}>Vegetariano</Text>
                </View>
                <View style = {styles.flex}>
                    <Text style = {[styles.tags, styles.tagMenor]} onPress={adicionarTag}>Vegano</Text>
                    <Text style = {styles.tags} onPress={adicionarTag}>Intolerância a lactose</Text>
                </View>
                <View style = {styles.flex}>
                    <Text style = {[styles.tags, styles.tagMenor]} onPress={adicionarTag}>Outro</Text>
                </View>
            </View>
            <Text style = {styles.button} onPress={handleBuscaNome} >Entrar</Text>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    chamada: {
        fontWeight:'500',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
        color: '#5B5B5B',
        textAlign: 'center',
    },
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
    mensagem:{
        color: '#3E3E3E',
        fontSize: 16,
        fontWeight: '500',
    },
    cadastrar:{
        color: '#E7320E',
        fontSize: 18,
    },
    flex:{
        flexDirection: 'row',
        justifyContent:'center',
    },
    restricoes:{
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
    },
    tags: {
        backgroundColor: '#6B6B6B',
        color: '#FFFFFF',
        fontSize: 16,
        borderRadius: 50,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        marginBottom: 5,
        marginRight: 5,
        textAlign:'center',
        paddingTop:2.5,
    },
    tagMenor:{
        width:135,
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
    voltar:{
        marginTop: 75,
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
    },
});

