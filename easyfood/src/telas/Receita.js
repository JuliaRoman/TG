import React, {Component} from 'react';
import { Text, StyleSheet, SafeAreaView, Image, Alert, ScrollView, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Receita( {route} ){

    const { response } = route.params;
    console.log(response);
    console.log(route.params);

    const navigation = useNavigation();

    const share = () => {
        Share.share({
            message: response,
        })
        .then((result) => console.log(result)) // Escreve resultado compartilhado no console
        .catch((erro) => console.log(erro)); // Em caso de erro, o escreve console
        
    }

    function handleBusca() {
        navigation.navigate('BuscaIngrediente');
    }

    function handlePerfil() {
        Alert.alert('Meu Perfil');
    }
    return (
        <SafeAreaView style = {styles.tela}>
            <ScrollView>
                <Text style = {styles.titulo}>Receita</Text>
                <Text style = {styles.txt}>{response}</Text>
            </ScrollView>
            {/*Botões flutuantes*/}
            <Text style = {[styles.btnFlutuante, styles.btnBusca]} onPress={handleBusca}>
                    <Image style={styles.icn} source={require('../../assets/icon_search.png')} />
                </Text>
                <Text style = {[styles.btnFlutuante, styles.btnPerfil]} onPress={handlePerfil}>
                    <Image style={styles.icn} source={require('../../assets/icon_perfil.png')} />
                </Text>
                <Text style = {[styles.btnFlutuante, styles.btnShare]} onPress={share}>
                    <Image style={styles.icn} source={require('../../assets/share.png')} />
                </Text>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    tela:{
        height:'100%',
    },
    titulo: {
        fontWeight:'900',
        color: '#E7320E',
        fontSize: 40,
        marginLeft: 50,
        marginTop: 50,
    },
    txt:{
        marginLeft: 50,
        marginRight: 50,
        fontSize: 16,
        color: '#5B5B5B',
        fontSize:16,
        paddingBottom:100,
    },
    btnFlutuante:{
        position:'absolute',
        bottom:20,
        width:60,
        height:60,
        borderRadius:50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        textAlign:'center',
        textVerticalAlign:'top',
    },
    btnBusca:{
        backgroundColor:'#2c2c2c',
        right:175,
    },
    btnPerfil:{
        backgroundColor:'#2c2c2c',
        right:100,
    },
    btnShare:{
        backgroundColor:'#E7320E',
        right:25,
    },
    icn:{
        resizeMode:'contain',
        width:35,
        height:35,
    },
});

