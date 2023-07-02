import logo from "./logo.svg";
import "./App.css";
// tab補完の方が正確に打てる
import ImageGallery from "./ImageGallery";
import { useRef, useState } from "react";

function App() {
  // inputTextに入力された文字列データを格納する
  /*useState()がfetchDataにデータが格納される度(APIを叩く度にsetFetchData()が呼ばれる)にその時だけレンダリングする。useState()は変数が動的に変わる場合に使われる。*/
  const [fetchData, setFetchData] = useState([]);
  // 入力された文字列はuseRefというhooksで取得する
  const ref = useRef();

  const handleSubmit = (e) => {
    // enterキー押すとページがリロードされるのを防ぐ。入力されたデータが消えてしまうため。
    e.preventDefault();
    console.log(ref.current.value);

    // API URL
    const endPointURL = `https://pixabay.com/api/?key=38020363-e1ef86546ef6d90261d478c53&q=${ref.current.value}+flowers&image_type=photo`;
    // APIを叩く（data fetching)
    /*endpointのurlを叩いて非同期処理でデータを受け取り、そのデータをjsonに変換してそれを
    さらにdataで受け取る。このデータを格納するために空の配列を用意(useState([]))*/
    fetch(endPointURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // json化したデータはobjectだからmap関数は使えない。objectの中のhitsプロパティはarrayなのでOK
        console.log(data.hits);
        setFetchData(data.hits);
      });
  };

  return (
    <div className="container">
      <h2>My Pixabay</h2>
      {/* 入力してenterキーを押した時に文字列のデータを取得したいからonSubmit */}
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* input属性で打ち込む文字列を格納監視する */}
        <input type="text" placeholder="画像を探す" ref={ref}></input>
      </form>
      {/* Appコンポーネントで用意したfetchDataをImageGalleryに渡す必要がある。=propsの受け渡し=コンポーネント間での変数のやりとりができる */}
      <ImageGallery fetchData={fetchData}></ImageGallery>
    </div>
  );
}

export default App;
