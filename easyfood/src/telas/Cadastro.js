import React, {useState} from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase-config';
//import { set } from 'react-native-reanimated';

export default function Cadastro( ){

    // const { emailResponse } = route.params;
    // const { passwordResponse } = route.params;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');  

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Account created')
            const user = userCredential.user;
            console.log(user);
            AlertCadastrou();
        })
        .catch(error => {
            console.log(error.code);
            console.log(error);
            console.log(error.message)

            switch (error.code) {
                case "auth/weak-password":
                    Alert.alert('Senha fraca!', 'Insira uma senha com pelo menos 5 caractéres', [
                        {text: 'Corrigir!'},
                      ]);
                    break;
                
                case "auth/invalid-email":
                    Alert.alert('Email invalido!', 'Insira um email válido!', [
                        {text: 'Corrigir!'},
                      ]);
                    break;

                case "auth/email-already-in-use":
                    Alert.alert('Email em uso!', 'Esse email ja está em uso! Utilize outro email ou volte e entre com o email.', [
                        {text: 'Voltar', onPress: () => handleInicial(), style: 'cancel'},
                        {text: 'utilizar outro email'}
                      ]);
                      break;
                case "auth/missing-password":
                    Alert.alert('Senha inválida!', 'Insira uma senha válida!', [
                        {text: 'Corrigir!'},
                      ]);
                      break;

                default:
                    Alert.alert('Erro de conexão!', 'Verifique sua conexão com a internet!', [
                        {text: 'Voltar'},
                      ]);
                      break;

            }
            
            console.log(email);

            console.log(password);

        })
    }

    const navigation = useNavigation();

    function handleRestricoes() {
        navigation.navigate('Restricoes');
    }

    function handleInicial() {
        navigation.navigate('Inicial');
    }

    function adicionarTag(tag){
        console.log(tag);
    }

    const[restricao, setRestricao] = useState("");
    const[visibilidade, setVisilidade] = useState(false);

    async function salvaRestricao(){
        const novaRestricao = {
            id:"1",
            titulo:restricao,
        }
        await AsyncStorage.setItem(novaRestricao.id, restricao.titulo)
        mostraRestricao();
    }

    async function mostraRestricao(){
        console.log(await AsyncStorage.getItem("1"));
    }

    const AlertCadastrou = () =>
    Alert.alert('Cadastro completo!', 'Aproveite nosso aplicativo!', [
      {text: 'Vamos nessa!', onPress: () => handleRestricoes()},
    ]);
  
    return (
        
        <SafeAreaView>
            <View style = {styles.voltar}>
                <Text style = {styles.mensagem}>Já possui conta?</Text>
                <Text style = {[styles.mensagem, styles.cadastrar]} onPress={handleInicial} >Acessar!</Text>
            </View>
            <TextInput style = {styles.input} placeholder="Insira seu nome" />
            <TextInput onChangeText={(text) => setEmail(text)} style = {styles.input} placeholder="Insira seu e-mail" />
            <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} style = {styles.input} placeholder="Insira uma senha" />

            <Text style = {styles.botao} onPress={handleCreateAccount}>Cadastrar</Text>
            {/* <Text style = {styles.button} onPress={handleCreateAccount} >Entrar</Text> */}
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
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
    chamada: {
        fontWeight:'500',
        fontSize: 20,
        marginTop: 20,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 20,
        color: '#5B5B5B',
        textAlign: 'center',
    },
    input:{
        borderWidth:1,
        borderColor: '#5B5B5B',
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
        fontSize: 16,
        paddingStart: 20,
        color: '#5B5B5B',
        borderRadius: 50,
        height: 50,
    },
    mensagem:{
        color: '#3E3E3E',
        fontSize: 16,
        fontWeight: '500',
    },
    cadastrar:{
        color: '#E7320E',
        fontSize: 18,
        marginBottom: 75,
    },
    flex:{
        flexDirection: 'row',
        justifyContent:'center',
    },
    restricoes:{
        marginBottom: 20,
        marginLeft: 50,
        marginRight: 50,
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
    button: {
        backgroundColor: '#E7320E',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        borderRadius: 50,
        height: 50,
        marginLeft: 50,
        marginBottom: 5,
        marginRight: 50,
        paddingTop: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    voltar:{
        marginTop: 75,
        marginLeft: 50,
        marginBottom: 20,
        marginRight: 50,
    },
});

