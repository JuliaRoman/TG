import React, {Component} from 'react';
import { Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BuscaNome(){

    const navigation = useNavigation();

    function handleBusca() {
        navigation.navigate('Busca por ingrediente');
    }

    function handlePerfil() {
        Alert.alert('Meu Perfil');
    }
    return (
        <SafeAreaView style = {styles.tela}>
            <Text style = {styles.txt}>Receita</Text>

            {/*Botões flutuantes*/}
            <Text style = {[styles.btnFlutuante, styles.btnBusca]} onPress={handleBusca}>
                <Image style={styles.icn} source={require('../../assets/icon_search.png')} />
            </Text>
            <Text style = {[styles.btnFlutuante, styles.btnPerfil]} onPress={handlePerfil}>
                <Image style={styles.icn} source={require('../../assets/icon_perfil.png')} />
            </Text>
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    tela:{
        height:'100%',
    },
    txt:{
        marginLeft: 50,
        marginTop: 70,
        marginRight: 50,
        fontSize: 16,
        color: '#5B5B5B',
        fontSize:16,
    },
    btnFlutuante:{
        position:'absolute',
        bottom:50,
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
        verticalAlign:'top',
    },
    btnBusca:{
        backgroundColor:'#E7320E',
        right:130,
    },
    btnPerfil:{
        backgroundColor:'#2c2c2c',
        right:50,
    },
    icn:{
        resizeMode:'contain',
        width:35,
        height:35,
    },
});

