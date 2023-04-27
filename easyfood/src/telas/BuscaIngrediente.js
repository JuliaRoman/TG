import React, {useState, Component} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView, Alert, Text, View, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { concat } from 'async';

export default function BuscaIngrediente(){

    const navigation = useNavigation();
    const [ingrediente, setIngrediente] = useState("");
    const [lista, setLista] = useState([]);
    const [listaFinal, setListaFinal] = useState("");

    const recipeResponse = async () => {
        try {
          const res = await axios.post(
            "https://api.openai.com/v1/engines/text-davinci-003/completions",
            {
              prompt: "me dê apenas uma receita existente (em formato de receita), descreva o sabor e apresente sua instrução com os ingredientes em [ "+ listaFinal + " ].\n Caso seja inserido algo que possa ferir os direitos humanos, diga que isso é proíbido. \n Se não foi inserido um ingrediente ou foi inserido um texto sem nexo com o assunto, então avise que não foram passados ingredientes validos e não dê uma receita.\nCaso não tenha nenhuma receita já existente que use apenas esses ingredientes como principal, indique outra receita com ingredientes similares ou deixe claro que não existe uma receita e sobre a questão disso na saúde.",
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

    const removerIngrediente = () => {
        setLista(lista.filter(setLista, lista.indexOf(ingrediente)));
    }

    function handleReceita(finalResponse) {
        setListaFinal(lista.join(', '));
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
});

