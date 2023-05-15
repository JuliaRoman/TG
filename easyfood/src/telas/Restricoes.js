import React, {useState} from "react";

import { Text, TextInput, StyleSheet, SafeAreaView, View, Alert, TouchableOpacity, Modal, Image } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Restricoes(){

    const[restricao, setRestricao] = useState("");
    const[visibilidade, setVisilidade] = useState(false);

    
    

    async function salvaRestricao(){
        const novaRestricao = {
            id:"1",
            titulo:restricao,
        }
        setVisilidade(false);
        
        await AsyncStorage.setItem(novaRestricao.id, restricao.titulo);

        mostraRestricao();
    }

    async function mostraRestricao(){
        console.log(await AsyncStorage.getItem("1"));
    }

    function adicionarTag(tag){
        console.log(tag);
    }

    return(
        <SafeAreaView>
            <Text style = {styles.chamada}>Possui alguma restrição ou dieta alimentar?</Text>
                <View style = {styles.restricoes}>
                    <View style = {styles.flex}>
                        <TouchableOpacity onPress={adicionarTag("Intolerância a glúten")}><Text style = {styles.tags}>Intolerância a glúten</Text></TouchableOpacity>
                        <TouchableOpacity onPress={adicionarTag("Vegetariano")}><Text style = {[styles.tags, styles.tagMenor]}>Vegetariano</Text></TouchableOpacity>
                    </View>
                    <View style = {styles.flex}>
                        <TouchableOpacity onPress={adicionarTag("Vegano")}><Text style = {[styles.tags, styles.tagMenor]} >Vegano</Text></TouchableOpacity>
                        <TouchableOpacity onPress={adicionarTag("Intolerância a lactose")}><Text style = {styles.tags}>Intolerância a lactose</Text></TouchableOpacity>
                    </View>
                    <View style = {styles.flex}>
                        <TouchableOpacity onPress={() => setVisilidade(true)}><Text style = {[styles.tags, styles.tagMenor]}>Outro</Text></TouchableOpacity>
                    </View>
                </View>
            
                <Modal animationType="slide" transparent={true} visible={visibilidade} onRequestClose={() => {setVisilidade(false)}}>
                    <View style = {styles.modal}>
                        <Image style={styles.imgTitulo} source={require('../../assets/icon_nova_restricao.png')} />
                        <TextInput style = {styles.input} placeholder="Insira restrição ou dieta" />
                        <TouchableOpacity style = {styles.botao} onPress={() => salvaRestricao()}>
                            <Text style = {styles.txtBotao}>ADICIONAR</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor:'white',
        alignItems:'center',
        maxWidth:'75%',
        alignSelf:'center',
        borderRadius:15,
        marginTop: '50%',
        padding:25,
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
    restricoes:{
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
    },
    input:{
        borderWidth:1,
        borderColor: '#5B5B5B',
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
        fontSize: 16,
        width: 250,
        textAlign:'center',
        color: '#5B5B5B',
        borderRadius: 50,
        height: 50,
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
    },
});