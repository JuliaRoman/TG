import React, {useState} from "react";

import { Text, TextInput, StyleSheet, SafeAreaView, View, Alert, TouchableOpacity, Modal, Image } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Restricoes(){

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
                        <TouchableOpacity style = {styles.botao} onPress={() => salvaRestricao()}><Text style = {styles.txtBotao}>ADICIONAR</Text></TouchableOpacity>
                    </View>
                </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor:'white',
        alignItems:'center',
    },
    botao:{
        backgroundColor: '#E7320E',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        borderRadius: 50,
        height: 50,
        marginLeft: 50,
        marginBottom: 5,
        marginRight: 50,
        textAlign:'center',
        paddingTop: 12.5,
        textTransform: 'uppercase',
    },
});