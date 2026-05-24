# chimo-chimo-loop

[![License](https://img.shields.io/github/license/ryu-dayo/chimo-chimo-loop?style=flat)](LICENSE)
[![GreasyFork Installs](https://img.shields.io/greasyfork/dt/556184?label=Installs&style=flat)](https://greasyfork.org/scripts/556184)
[![GitHub stars](https://img.shields.io/github/stars/ryu-dayo/chimo-chimo-loop?style=flat)](https://github.com/ryu-dayo/chimo-chimo-loop/stargazers)

*Read this in other languages: [English](README.md), [简体中文](README.zh-CN.md)*

![chimo-chimo-loop showcase](./assets/hero.jpg)

HTML5動画に、PiP（ピクチャインピクチャ）、A-Bリピート、再生速度コントロール、メディア統計情報などの機能を備えた、洗練された軽量フローティング・コントロールバーを追加するユーザースクリプトです。

> 主に **macOS版 Safari** で動作確認を行っています。Chromium系ブラウザ（Edgeなど）にも対応しています。

## 機能とショートカット

> 💡 **修飾キー:** Windows では `Alt` キー、macOS では `Option (⌥)` キーを使用します。
> *注: 入力フォームやテキストエリアでの入力中は、競合を避けるためショートカットが自動的に無効化されます。*

| 機能 | 説明 | ショートカット |
| :--- | :--- | :--- |
| 🔳 **ピクチャインピクチャ** | フローティング動画モードのオン/オフ。 | `⌥` + `P` |
| 🔁 **A-B リピート** | `L` で全体ループを有効化（同時にA点を自動設定）。<br>`B` を押してB点をロックし、A-B区間リピートを開始。 | `⌥` + `L` / `B` |
| 📸 **無劣化スクリーンショット** | UIの写り込みなしに、1:1のオリジナル解像度でPNGフレームをキャプチャ。 | `⌥` + `S` |
| 🪞 **空間コントロール** | `M` で左右反転（ミラー）。<br>`R` で90°単位の回転（自動スケーリング対応）。 | `⌥` + `M` / `R` |
| ⏩ **再生速度** | `-` で減速、`=` で加速 (0.5x ~ 2.0x)。<br>`0` を押すと即座に 1.0x（等倍）にリセット。 | `⌥` + `-` / `=` / `0` |
| ⏪ **シーク＆再生** | `Space` で再生 / 一時停止。<br>`←` / `→` で 5秒 後退 / 前進。 | `⌥` + `Space` / `←` / `→` |
| 🔊 **音声コントロール** | `↑` / `↓` で音量を 10% 調整。<br>`U` でミュートの切り替え。 | `⌥` + `↑` / `↓` / `U` |
| 📊 **メディア統計情報** | リアルタイムのFPS、解像度、カラースペース表示の切り替え。 | `⌥` + `I` |
| 👻 **自動非表示** | 操作がない状態が 3秒 続くと、UIがエレガントにフェードアウト。 | - |

> **💡 ヒント:** **A-Bリピート**と**0.5倍速再生**を組み合わせれば、両手を使う複雑なギターの指弾きや、細かなダンスの振り付けのマスターに非常に役立ちます。

## 互換性について

- **ユニバーサルサポート**: 標準のHTML5 `<video>` 要素を使用しているほとんどのページで動作します。
- **ネイティブ機能の優先**: ウェブサイト自体が同様の機能を標準で提供している場合は、最高のユーザー体験を得るために、サイト内蔵のコントロールを使用することをお勧めします。
- **動作に関する注意事項**: 一部のプラットフォームでは独自の再生ロジックを採用しているため、スクリプトの表示状態と実際のサイトの動作に差異が生じる場合があります。

## インストール

**[🚀 GreasyFork からインストール](https://greasyfork.org/scripts/556184)**

---

> *"See you in the next loop."*