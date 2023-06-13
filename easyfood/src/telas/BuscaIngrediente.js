import React, {useState, Component} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView, Alert, Text, View, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { concat } from 'async';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BuscaIngrediente(){

    

    const navigation = useNavigation();
    const [ingrediente, setIngrediente] = useState("");
    const [lista, setLista] = useState([]);
    const [listaFinal, setListaFinal] = useState("");

    const getStorage = async() => {
        const tdsChaves = await AsyncStorage.getAllKeys();
        return AsyncStorage.multiGet(tdsChaves);
    }

    const recipeResponse = async () => {

        let restringe = getStorage();
        console.log("restrições: ");
        console.log(restringe);

        var finallist = lista.join(",");
        try {
            Alert.alert('Carregando!', 'Espere alguns segundos até surgir a tela de receita!', [
                {text: 'Voltar!'},
                ]);
          const res = await axios.post(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
              prompt: "me dê apenas uma receita existente (em formato de receita), descreva o sabor e apresente sua instrução com os ingredientes em [ "+ finallist + " ].\n Caso seja inserido algo que possa ferir os direitos humanos, diga que isso é proíbido. \n Se não foi inserido um ingrediente ou foi inserido um texto sem nexo com o assunto, então avise que não foram passados ingredientes validos e não dê uma receita.\nCaso não tenha nenhuma receita já existente que use apenas esses ingredientes como principal, indique outra receita com ingredientes similares ou deixe claro que não existe uma receita e sobre a questão disso na saúde.",
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
          
          console.log("O valor input foi: " + listaFinal + " com o tipo :" + typeof(listaFinal));
          console.log("A resposta: " + res.data.choices[0].text + "\n e o tipo é: " + typeof(res.data.choices[0].text));
          handleReceita(res.data.choices[0].text);
        } catch (err) {
          console.error(err);
        }
      };

    const adicionarIngrediente = () => {
        if(ingrediente==''){
            Alert.alert("Campo vazio!");
        }else{
            setLista(lista.concat(ingrediente));
            setIngrediente('');
        }
    }

    function removerIngrediente(tag){
        const novaLista = lista.filter((lista) => lista !== (tag.item));
        setLista(novaLista);
    }

    function limparLista(){
        const novaLista = lista.filter((lista) => lista !== lista);
        setLista(novaLista);
    }

    function handleReceita(finalResponse) {
        setListaFinal(lista.join(', '));
        console.log("\n\ntransportando.... : " + finalResponse);
        navigation.navigate('Receita', {response: finalResponse});
    }

    function handleBuscaNome() {
        navigation.navigate('BuscaNome');
    }

    const handleRenderIng = ({item}) =>
        <Text style = {styles.tagRestricao}>
            <Text style = {styles.tags}>{item} </Text>
            {/* <TouchableWithoutFeedback style = {styles.btnRemover} onPress={() => removerIngrediente(item)}>
                <Text style = {styles.txtRemover}>+</Text>
            </TouchableWithoutFeedback> */}
        </Text>

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
            {/*Botão flutuante - Limpar tudo*/}
            <Text style = {[styles.btnFlutuante, styles.btnLimpa]} onPress={() => limparLista()}>
                <Image style = {[styles.icn]} source={require('../../assets/trash-can.png')} />
            </Text>
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
    imgTitulo:{
        alignSelf:'center',
        marginTop:50,
        marginBottom:50,
        maxWidth: 310,
        height: 130,
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
    flex:{
        flexDirection: 'row',
        justifyContent:'center',
        marginLeft:50,
        marginRight: 50,
    },
    tags: {
        // color: '#FFFFFF',
        color: '#FF8543',
        fontSize: 16,
        fontWeight: '900',
        position:'relative',
        textAlignVertical:'center',
        paddingTop:12.5,
        
    },
    tagRestricao:{
        // backgroundColor: '#FF8543',
        borderRadius: 50,
        marginLeft: 50,
        height: 50,
        marginRight: 50,
        marginBottom:5,
        paddingStart:25,
        position:'relative',
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
    btnRemover:{
        marginLeft:50,
    },

    txtRemover:{
        fontSize:30,
        fontWeight:600,
        textAlign:'right',
        right:25,
        color:'white',
        marginLeft:50,
        textAlignVertical:'bottom',
        paddingLeft:50,
    },
    btnFlutuante:{
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
    icn:{
        maxWidth:45,
        width:30,
        height:30,
        transform: [{scale: 0.5}],
        position:'absolute',
        left:10,
        
    },
});

