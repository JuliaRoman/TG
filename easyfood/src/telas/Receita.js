import React, {Component, useState} from 'react';
import { Text, StyleSheet, SafeAreaView, Image, Alert, ScrollView, Share, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TagRestricao } from '../componentes/TagRestricao';

export default function Receita( {route} ){

    const { response } = route.params;
    console.log(response);
    console.log(route.params);

    const [visibilidade, setVisilidade] = React.useState(false);
    const [restricoes, setRestricoes] = useState("");

    const navigation = useNavigation();

    const share = () => {
        Share.share({
            message: response,
        })
        .then((result) => console.log(result)) // Escreve resultado compartilhado no console
        .catch((erro) => console.log(erro)); // Em caso de erro, o escreve console
        
    }

    function handlePerfil() {
        colherDados();
        setVisilidade(true);
    }

    async function colherDados(){
        const tdsChaves = await AsyncStorage.getAllKeys();
        setRestricoes(await AsyncStorage.multiGet(tdsChaves));
    }

    function handleBusca() {
        navigation.navigate('BuscaIngrediente');
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

                {/*Modal item*/}
                <Modal style = {styles.fundoModal} animationType="slide" transparent={true} visible={visibilidade} onRequestClose={() => {setVisilidade(false)}}>
                    <View style = {styles.modal}>
                        <TouchableOpacity style = {styles.btnFechar} onPress={() => setVisilidade(false)}>
                            <Text style = {styles.txtFechar}>x</Text>
                        </TouchableOpacity>
                        <Text style = {styles.titPerfil}>Seu perfil</Text>
                        <FlatList style={styles.lista} data={restricoes} renderItem={(restricoes) => <TagRestricao {...restricoes}/>} keyExtractor={restricoes => restricoes[0]}></FlatList>
                        <TouchableOpacity onPress={() => setVisilidade(false)}>
                            <Text style = {styles.buttonAtt}>ATUALIZAR</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
    titPerfil:{
        color:'#E7320E',
        fontSize:25,
        fontWeight:700,
        marginBottom:15,
      },
      btnPerfil:{
        backgroundColor:'#2c2c2c',
        right:25,
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
      modal:{
        backgroundColor:'white',
        alignItems:'center',
        maxWidth:'75%',
        width: 300,
        minHeight:250,
        alignSelf:'center',
        borderRadius:15,
        marginTop: '50%',
        padding:25,
      },
      fundoModal:{
        backgroundColor:'#333',
      },
      buttonAtt: {
        backgroundColor: '#E7320E',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        borderRadius: 50,
        height: 35,
        paddingTop: 7,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
        width:175,
      },
      btnFechar:{
        position:'absolute',
        right:25,
        top:15,
      },
      txtFechar:{
        fontSize:25,
        fontWeight:600,
      },
});

