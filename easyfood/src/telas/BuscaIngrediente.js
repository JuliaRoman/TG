import React, {useState, Component} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView, Alert, Text, View, FlatList, TouchableWithoutFeedback, ScrollView, Modal,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { concat } from 'async';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TagRestricao } from '../componentes/TagRestricao';

export default function BuscaIngrediente(){

    const [visibilidade, setVisilidade] = React.useState(false);

    const navigation = useNavigation();
    const [ingrediente, setIngrediente] = useState("");
    const [lista, setLista] = useState([]);
    const [restricoes, setRestricoes] = useState("");
    
    function handlePerfil() {
        colherDados();
        setVisilidade(true);
    }

    async function colherDados(){
        const tdsChaves = await AsyncStorage.getAllKeys();
        setRestricoes(await AsyncStorage.multiGet(tdsChaves));
    }

    const recipeResponse = async () => {
        var finallist = lista.join(', ');
        if( finallist != "") {
            try {
                const res = await axios.post(
                  "https://api.openai.com/v1/engines/text-davinci-003/completions",
                  {
                    prompt: "me dê apenas uma receita existente (em formato de receita), descreva o sabor e apresente sua instrução com os ingredientes em  "+ finallist + " .\n Caso seja inserido algo que possa ferir os direitos humanos, diga que isso é proíbido. \n Se não foi inserido um ingrediente ou foi inserido um texto sem nexo com o assunto, então avise que não foram passados ingredientes validos e não dê uma receita.\nCaso não tenha nenhuma receita já existente que use apenas esses ingredientes como principal, indique outra receita com ingredientes similares ou deixe claro que não existe uma receita e sobre a questão disso na saúde.",
                    temperature: 0.3,
                    max_tokens: 600,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                  },
                  {
                    headers: {
                      Authorization: `Bearer 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`,
                      "Content-Type": "application/json",
                    },
                  }
                );
            
                console.log("O valor input foi: '" + finallist + "' com o tipo :" + typeof(finallist));
                console.log(lista);
                console.log("A resposta: " + res.data.choices[0].text + "\n e o tipo é: " + typeof(res.data.choices[0].text));
                handleReceita(res.data.choices[0].text);
              } catch (err) {
                console.error(err);
              }
        }else if(finallist == ""){
            Alert.alert('Lista Vazia', 'Insira algum ingrediente!', [
                {text: 'Voltar!'},
            ]);
            console.log("lista de ingredientes vazia");
            
        }
        
    };

    const adicionarIngrediente = async () => {
        if(ingrediente==''){
            Alert.alert("Campo vazio!");
        }else{
            await setLista(lista.concat(ingrediente));
            setIngrediente('');
            
        }
    }

    const removerIngrediente = () => {
        setLista(lista.filter(setLista, lista.indexOf(ingrediente)));
    }

    async function handleReceita(finalResponse) {
        console.log("\n\ntransportando.... : " + finalResponse);
        navigation.navigate('Receita', {response: finalResponse});
    }

    function handleBuscaNome() {
        navigation.navigate('BuscaNome');

    }

    const handleRenderIng = ({item}) => <Text style = {styles.tags}>{item} {/*<TouchableWithoutFeedback onPress={removerIngrediente}><Text>x</Text></TouchableWithoutFeedback>*/}</Text>

    return (
        <SafeAreaView style={styles.tela}>
            <Image style={styles.imgTitulo} source={require('../../assets/img_busca_ingrediente.png')} />
            <View style={styles.flex}>
                <TextInput style = {styles.input} value={ingrediente} onChangeText={(ingrediente)=>setIngrediente(ingrediente)} placeholder="Insira um ingrediente" />
                <TouchableWithoutFeedback onPress={adicionarIngrediente}>
                    <Text style = {styles.buttonPlus} >+</Text>
                </TouchableWithoutFeedback>
            </View>
            <FlatList style = {styles.listagem} data={lista} key={ingrediente} keyExtractor={item => item} renderItem={handleRenderIng} />
            <View style = {styles.fixo}>
                <Text style = {styles.button} onPress={recipeResponse}>Buscar</Text>
                <View style = {styles.voltar}>
                    <Text style = {styles.mensagem}>Deseja pesquisar por nome de receita?</Text>
                    <Text style = {[styles.mensagem, styles.cadastrar]} onPress={handleBuscaNome} >Clique aqui!</Text>
                </View>
            </View>


            {/*Botões flutuantes*/}
            <Text style = {[styles.btnFlutuante, styles.btnPerfil]} onPress={handlePerfil}>
                <Image style={styles.icn} source={require('../../assets/icon_perfil.png')} />
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
        width:'100%',
        height:'100%',
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
    imgTitulo:{
        alignSelf:'center',
        marginTop:50,
        marginBottom:50,
        maxWidth: 310,
        height: 130,
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
    button: {
        backgroundColor: '#E7320E',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        borderRadius: 50,
        height: 50,
        paddingTop: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
        width:310,
        marginBottom:20,
    },
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
    flex:{
        flexDirection: 'row',
        justifyContent:'center',
        marginLeft:50,
        marginRight: 50,
    },
    tags: {
        backgroundColor: '#FF8543',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        borderRadius: 50,
        height: 50,
        marginLeft: 50,
        marginBottom: 5,
        marginRight: 50,
        paddingTop: 12.5,
        paddingStart:20,
        textAlign: 'left',
    },
    listagem:{
        marginBottom:120,
    },
    fixo:{
        bottom:50,
        marginLeft: 50,
        marginRight: 50,
        position:'absolute',
    },
    mensagem:{
        color: '#3E3E3E',
        fontSize: 16,
        fontWeight: '500',
        textAlign:'center',
    },
    cadastrar:{
        color: '#E7320E',
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

