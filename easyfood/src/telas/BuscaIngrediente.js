import React, {useState} from 'react';
import { Image, TextInput, StyleSheet, SafeAreaView, Alert, Text, View, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BuscaIngrediente(){

    const navigation = useNavigation();
    const [ingrediente, setIngrediente] = useState("");
    const [lista, setLista] = useState([]);

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

    function handleReceita() {
        navigation.navigate('Receita');
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
            <Text style = {styles.button} onPress={handleReceita}>Buscar</Text>
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
        marginLeft: 50,
        marginRight: 50,
        paddingTop: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
        position:'absolute',
        width:310,
        bottom:50,
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
    }
});

