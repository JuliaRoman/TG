import React, {useState} from "react";
import { Text, TextInput, StyleSheet, SafeAreaView, View, Alert, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Restricoes(){

    const navigation = useNavigation();

    function handleBusca() {
        navigation.navigate('BuscaIngrediente');
    }

    const[restricao, setRestricao] = useState("");
    const[listaRestricoes, setListaRestricoes] = useState("");
    
    const[visibilidade, setVisilidade] = useState(false);

    const compRestricao = ({item}) => <Text style = {[styles.tags, styles.listaItem]}>{item}</Text>

    async function mostraRestricao(){
        console.log(await AsyncStorage.getItem("1"));
        const tdsChaves = await AsyncStorage.getAllKeys();
        const tdsRestricoes = await AsyncStorage.multiGet(tdsChaves);
        setListaRestricoes(tdsRestricoes);
        console.log(listaRestricoes);
    }

    async function salvarRestricao(){
        const novoId = await gerarId();
        
        const novaRestricao = {
            id:novoId.toString(),
            titulo:restricao,
        }

        if(restricao==""){
            console.log("Vazio");
        }else{
            await AsyncStorage.setItem(novaRestricao.id, novaRestricao.titulo);
        }    
    
        setRestricao("");
        
        await AsyncStorage.removeItem("EXPO_CONSTANTS_INSTALLATION_ID");
        mostraRestricao();
        //await AsyncStorage.clear(); //Limpar todo Async
        handleBusca();
    }

    function adicionarNovaRestricao(tag){
        setRestricao(tag);
        console.log(restricao);

        salvarRestricao();

        setVisilidade(false);
    }

    async function gerarId(){
        const tdsChaves = await AsyncStorage.getAllKeys();
        
        if(tdsChaves <= 0 ){
            return 1;
        }
        return tdsChaves.length + 2;
    }

    return(
        <SafeAreaView>
            <Text style = {styles.chamada}>Possui alguma restrição ou dieta alimentar?</Text>
                <View style = {styles.restricoes}>
                    <View style = {styles.flex}>
                        <TouchableOpacity onPress={() => adicionarNovaRestricao("Intolerância a glúten")}><Text style = {styles.tags}>Intolerância a glúten</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => adicionarNovaRestricao("Vegetariano")}><Text style = {[styles.tags, styles.tagMenor]}>Vegetariano</Text></TouchableOpacity>
                    </View>
                    <View style = {styles.flex}>
                        <TouchableOpacity onPress={() => adicionarNovaRestricao("Vegano")}><Text style = {[styles.tags, styles.tagMenor]} >Vegano</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => adicionarNovaRestricao("Intolerância a lactose")}><Text style = {styles.tags}>Intolerância a lactose</Text></TouchableOpacity>
                    </View>
                    <View style = {styles.flex}>
                        <TouchableOpacity onPress={() => setVisilidade(true)}><Text style = {[styles.tags, styles.tagMenor]}>Outro</Text></TouchableOpacity>
                    </View>
                    
                    <Text style = {styles.chamada}>Restrições adicionadas:</Text>
                    <View style={styles.lista}>
                        <FlatList style={styles.lista} data={listaRestricoes} renderItem={compRestricao} keyExtractor={listaRestricoes => listaRestricoes[0]}></FlatList>
                    </View>

                    <TouchableOpacity style = {[styles.botao, styles.btnPrincipal]} onPress={() => salvarRestricao()}>
                        <Text style = {styles.txtBotao}>FINALIZAR</Text>
                    </TouchableOpacity>
                </View>

                <Modal style = {styles.fundoModal} animationType="slide" transparent={true} visible={visibilidade} onRequestClose={() => {setVisilidade(false)}}>
                    <View style = {styles.modal}>
                        <TouchableOpacity style = {styles.btnFechar} onPress={() => setVisilidade(false)}>
                            <Text style = {styles.txtFechar}>x</Text>
                        </TouchableOpacity>
                        <Image style={styles.imgTitulo} source={require('../../assets/icon_nova_restricao.png')} />
                        <TextInput style = {styles.input} onChangeText={(restricao)=>setRestricao(restricao)} placeholder="Insira restrição ou dieta" />
                        <TouchableOpacity style = {styles.botao} onPress={() => adicionarNovaRestricao(restricao)}>
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
    fundoModal:{
        backgroundColor:'#333',
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
    listaItem:{
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        color:'#333',
    },
    lista:{
        alignSelf:'center',
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