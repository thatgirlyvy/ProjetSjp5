
import React, {useState} from 'react';
import { StyleSheet, Text, View,ScrollView, SafeAreaView, FlatList, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaViewBase } from 'react-native';
import AddTodo from './components/additem';
import Header from './components/header';

export default function App() {

  const [data, setData] = useState([
    { text: 'buy coffee', id: '1' },
    { text: 'create an app', id: '2' },
    { text: 'play on the switch', id: '3' },
  ]);
  const [todo, setTodo] = useState([
    { text: 'say high', id: '1' },
    { text: 'update computer', id: '2' },
    { text: 'be safe', id: '3' },
  ]);
  const [isRender, setIsRender] = useState(false);
  const [isRend, setIsRend] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState();
  const [inputTodo, setInputTodo] = useState();
  const [editItem, setEditItem] = useState();
  const [editTodo, setEditTodo] = useState();
  const [selectedId, setSelectedId] = useState();
  const [selectedInd, setSelectedInd] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedTodo, setSelectedTodo] = useState();

  const onClickItem = (item, index) => {
    setSelectedId(item.id);
    setSelectedItem(item.text);
    const newArrData = data.map((e, index) => {
      if(item.id == e.id) {
        return {
          ...e,
          selected: true
        }
      }
      return {
        ...e,
        selected: false
      }
    })
    setData(newArrData);
  }

  const onClickTodo = (item, index) => {
    setSelectedInd(item.id);
    setSelectedTodo(item.text);
    const newArrData = todo.map((e, index) => {
      if(item.id == e.id) {
        return {
          ...e,
          selected: true
        }
      }
      return {
        ...e,
        selected: false
      }
    })
    setTodo(newArrData);
  }

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
      onPress= {() => onClickItem(item, index)}
      style={[
        styles.item,
        {
          marginTop: 11,
          height: 150,
          backgroundColor: item.selected ? 'orange' : 'white'
        }
      ]}>
        <Text> {item.text} </Text>
      </TouchableOpacity>
    )
  }

  const renderTodo = ({item, index}) => {
    return (
      <TouchableOpacity
      onPress= {() => onClickTodo(item, index)}
      style={[
        styles.item,
        {
          marginTop: 11,
          height: 150,
          backgroundColor: item.selected ? 'orange' : 'white'
        }
      ]}>
        <Text> {item.text} </Text>
      </TouchableOpacity>
    )
  }

  const handleEditItem = (editItem) => {
    const newData = data.map(item => {
      if (item.id == editItem) {
        item.text = inputText;
        return item;
      }
      return item;
    })
    setData(newData);
    setIsRender(!isRender);
  }

  const handleEditTodo = (editTodo) => {
    const newData = todo.map(item => {
      if (item.id == editTodo) {
        item.text = inputTodo;
        return item;
      }
      return item;
    })
    setTodo(newData);
    setIsRend(!isRend);
  }

  const onModifySelectedItem = () => {
    setIsModalVisible (true);
    setInputText(selectedItem);
    setEditItem(selectedId);
  }

  const onModifySelectedTodo = () => {
    setIsModalVisible(true);
    setInputTodo(selectedTodo);
    setEditTodo(selectedInd);
  }

  const onPressSaveEdit = ()  => {
    handleEditItem(editItem);
    setIsModalVisible(false);
  }

  const onPressSaveTodo = () => {
    handleEditTodo(editTodo);
    setIsModalVisible(false);
  }

  const onDeleteSelectedItem = (id) => {
    setData(prevData => {
      return prevData.filter(data => data.id != id)
    })
  }

  const onDeleteSelectedTodo = (id) => {
    setTodo(prevData => {
      return prevData.filter(todo => todo.id != id)
    })
  }
  const [text, setText] = useState('');
  const submitHandler = (text) => {
    if(text.length > 3){
      setText('');
      setData(prevData => {
        return [
          { text, id: data.length + 1 },
          ...prevData
        ];
      });
    } else {
      Alert.alert('OOPS', 'Todo must be over 3 characters long', [
        {text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  const sendToLeft = () => {
    submitHandler(selectedTodo);
    onDeleteSelectedTodo(selectedInd);
  }

  const sendToRight = () => {
    submitTodo(selectedItem);
    onDeleteSelectedItem(selectedId);
  }

  const submitTodo = (text) => {
    if(text.length > 3){
      setText('');
      setTodo(prevData => {
        return [
          { text, id: todo.length + 1 },
          ...prevData
        ];
      });
    } else {
      Alert.alert('OOPS', 'Todo must be over 3 characters long', [
        {text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed');
    }}>
      <SafeAreaView>
      <Header/>
      <View style={styles.container}>
        <View style={styles.box}>
          <ScrollView>
            <SafeAreaView style={styles.inner}>
      <FlatList data={data} renderItem={renderItem} keyExtractor={item => `key-${item.id}`}  extraData={isRender}/>
      </SafeAreaView>
      </ScrollView>
      </View>
      <View style={styles.boxo}>
     <AddTodo submitHandler={submitHandler} />
     <View style={[styles.options, {flexDirection:'row'}]}>
      <TouchableOpacity onPress ={() => onModifySelectedItem()} keyExtractor = {selectedId} >
        <View style={styles.button}>
        <Text > M </Text>
        </View>
        <Modal animationType='fade' visible={isModalVisible} 
        onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.text}> Change Text </Text>
            <TextInput style={styles.textInput} 
            onChangeText= {(text) => setInputText(text)}
            defaultValue={inputText}
            editable= {true}
            multiline={false}
            maxLength={200}/>
            <TouchableOpacity onPress={() => onPressSaveEdit()} style={styles.TouchableSave}>
              <Text style={styles.text}> Save </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => onDeleteSelectedItem(selectedId)} keyExtractor={selectedId}>
        <View style={styles.button}>
        <Text style={styles.buttonText}>  - </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendToRight()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}> right </Text>
        </View>
      </TouchableOpacity>
      </View>
      </View>
      <View style={styles.boxo}>
     <AddTodo submitHandler={submitTodo} />
     <View style={[styles.options, {flexDirection:'row'}]}>
      <TouchableOpacity onPress ={() => onModifySelectedTodo(selectedInd)} keyExtractor = {selectedInd} >
        <View style={styles.button}>
        <Text style={styles.buttonText}> M </Text>
        </View>
        <Modal animationType='fade' visible={isModalVisible} 
        onRequestClose={() => setIsModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.text}> Change Text </Text>
            <TextInput style={styles.textInput} 
            onChangeText= {(text) => setInputTodo(text)}
            defaultValue={inputTodo}
            editable= {true}
            multiline={false}
            maxLength={200}/>
            <TouchableOpacity onPress={() => onPressSaveTodo()} style={styles.TouchableSave}>
              <Text style={styles.text}> Save </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => onDeleteSelectedTodo(selectedInd)} keyExtractor={selectedInd}>
        <View style={styles.button}>
        <Text style={styles.buttonText}>  DEL </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sendToLeft()} keyExtractor={selectedInd}>
        <View style={styles.button}>
          <Text style={styles.buttonText}> left </Text>
        </View>
      </TouchableOpacity>
      </View>
      </View>
      <View style={styles.box}>
          <ScrollView>
            <SafeAreaView style={styles.inner}>
      <FlatList data={todo} renderItem={renderTodo} keyExtractor={item => `key-${item.id}`}  extraData={isRend}/>
      </SafeAreaView>
      </ScrollView>
      </View>
      </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container : {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
},
box: {
    width: '50%',
    height: '50%',
    padding: 1
},
button: {
  borderRadius: 8,
  paddingVertical: 5,
  paddingHorizontal: 15,
  backgroundColor: 'pink',
},
buttonText: {
  color: 'black',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: 15,
  textAlign: 'center',
},
inner: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
},
item: {
    marginTop:5,
    padding:5,
    backgroundColor: 'pink',
    fontSize: 15,
    alignItems: 'flex-start'
    },
    text: {
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    textInput: {
        width: '90%',
        height: 70,
        borderColor: 'grey',
        borderWidth: 1,
        fontSize: 15
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    TouchableSave: {
        backgroundColor: 'orange',
        paddingHorizontal: 100,
        alignItems: 'center',
        marginTop: 20
    },
    options : {
        flex: 5,
        padding: 15,
        height: '25%',
    },
    boxo: {
        width: '50%',
        height: '25%',
        padding: 1,
        marginTop: 100,
        justifyContent: 'flex-start'
    },
});
