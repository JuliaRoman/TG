import React, {useState} from "react";
import { Text, TextInput, StyleSheet, SafeAreaView, View, Alert, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import {TagRestricao} from "../componentes/TagRestricao.js"

export default function Restricoes({route}){
    
    const navigation = useNavigation();

    function handleBusca() {
        navigation.navigate('BuscaIngrediente');
    }

    const[restricao, setRestricao] = useState("");
    const[listaRestricoes, setListaRestricoes] = useState([]);

    async function mostraRestricao(){
        console.log("mostraRestricao");
        console.log(await AsyncStorage.getItem("1"));
        const tdsChaves = await AsyncStorage.getAllKeys();
        const tdsRestricoes = await AsyncStorage.multiGet(tdsChaves);
        setListaRestricoes(tdsRestricoes);
        console.log(listaRestricoes);
    }

    async function salvarRestricao(){
        const novoId = await gerarId();
        //const {usuario} = route.params;
        const novaRestricao = {
            id:novoId.toString(),
            titulo:restricao,
        }

        if(restricao==""){
            console.log("Vazio");
        }else{
           await AsyncStorage.setItem(novaRestricao.id, novaRestricao.titulo);
        }    
    
        //setRestricao("");
        
        //await AsyncStorage.removeItem("EXPO_CONSTANTS_INSTALLATION_ID");
        mostraRestricao();
        //await AsyncStorage.clear(); //Limpar todo Async
    }

    async function adicionarNovaRestricao(tag){
        setRestricao(tag);
        console.log(restricao);

        salvarRestricao();
        setRestricao("");
    }

    async function idChave(){
        return await AsyncStorage.getAllKeys();
    }

    async function limparLista(){
        setRestricao("");
        AsyncStorage.clear(); //Limpar todo Async
        AsyncStorage.removeItem("EXPO_CONSTANTS_INSTALLATION_ID");
        setRestricao("");
        mostraRestricao();
    }

    async function gerarId(){
        const tdsChaves = await idChave();
        if(tdsChaves <= 0 ){
            return 1;
        }else{
            return tdsChaves + 1;
        }
    }

    return(
        <SafeAreaView>
            <Text style = {styles.chamada}>Possui alguma restrição ou dieta alimentar?</Text>
                <View style = {styles.restricoes}>
                    <Image style={styles.imgTitulo} source={require('../../assets/icon_nova_restricao.png')} />
                    <View style={styles.flex}>
                    <TextInput style = {styles.input} onChangeText={(restricao)=>setRestricao(restricao)} placeholder="Insira restrição ou dieta" />
                        <TouchableOpacity onPress={() => adicionarNovaRestricao(restricao)}>
                            <Text style = {styles.buttonPlus} >+</Text>
                        </TouchableOpacity>
                    </View>
                    
                    
                    <Text style = {styles.chamada}>Restrições adicionadas:</Text>
                    <View style={styles.lista}>
                       <FlatList style={styles.lista} data={listaRestricoes} renderItem={(listaRestricoes) => <TagRestricao {...listaRestricoes}/>} keyExtractor={listaRestricoes => listaRestricoes[0]}></FlatList>
                    </View>

                    <TouchableOpacity style = {[styles.botao, styles.btnPrincipal]} onPress={() => handleBusca()}>
                        <Text style = {styles.txtBotao}>FINALIZAR</Text>
                    </TouchableOpacity>
                </View>

            {/*Botão flutuante - Limpar tudo*/}
            <Text style = {[styles.btnFlutuante, styles.btnLimpa]} onPress={() => limparLista()}>
                <Image style = {[styles.icn]} source={require('../../assets/trash-can.png')} />
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    buttonPlus:{
        width:50,
        height:50,
        color:'white',
        textAlign:'center',
        fontWeight:600,
        fontSize:30,
        backgroundColor:'#2c2c2c',
        borderRadius: 50,
    },
    flex:{
        flexDirection: 'row',
        justifyContent:'center',
    },
    botao:{
        backgroundColor: '#E7320E',
        width:150,
        borderRadius: 50,
        height: 50,
        marginLeft: 50,
        marginBottom: 5,
        marginRight: 50,
        textAlign:'center',
        paddingTop: 12.5,
        minWidth:250,
        textTransform: 'uppercase',
    },
    txtBotao:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        textAlign: 'center',
    },
    btnPrincipal:{
        alignSelf:'center',
        marginTop:50,
        position:'absolute',
        bottom:20,
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
        textAlign:'left',
        paddingLeft:20,
        paddingTop:2.5,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    restricoes:{
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
        alignItems:'center',
    },
    lista:{
        alignSelf:'center',
    },
    input:{
        borderWidth:1,
        borderColor: '#5B5B5B',
        marginBottom: 20,
        marginRight: 10,
        fontSize: 16,
        paddingStart: 20,
        color: '#5B5B5B',
        borderRadius: 50,
        height: 50,
        width:260,
    },
    chamada: {
        fontWeight:'500',
        fontSize: 20,
        marginTop: 75,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
        color: '#5B5B5B',
        textAlign: 'center',
    },btnFlutuante:{
        position:'absolute',
        bottom:20,
        width:50,
        height:50,
        borderRadius:50,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        // textAlign:'center',
        verticalAlign:'top',
        paddingStart:10,
    },
    btnLimpa:{
        backgroundColor:'#2c2c2c',
        right:25,
    },
});