import type { Menu } from '@/types';

/**
 * Hair Boutique twenty four 公式メニュー（projects/salon-24/menu.md と同期）
 * 予約システム用の外部URLは含めません。
 */
export const menus: Menu[] = [
  // --- レディース ---
  {
    id: 's24-l-01',
    name: 'Pickup! レディースプレミアムSコース(CUT＋艶髪orダメージ補修トリートメント＋ヘッドスパ)＋ケアプロ',
    category: 'ladies',
    duration: 115,
    price: 18260,
    tag: 'Pickup!',
    description:
      'Pickup! レディースプレミアムSコース。シャンプーブロー・CUT、艶髪またはダメージ補修トリートメント、ヘッドスパに加えケアプロを含みます。',
  },
  {
    id: 's24-l-02',
    name: 'Pickup! レディースプレミアムコース(シャンプーCUT＋しっかりトリートメント＋ヘッドスパ)',
    category: 'ladies',
    duration: 90,
    price: 14960,
    tag: 'Pickup!',
    description:
      'レディーススタンダードコース(シャンプーブローCUT＋しっかりトリートメント(ケアプロ)＋ヘッドスパ)',
  },
  {
    id: 's24-l-03',
    name: 'Cut+Color＋Treatment / カット＋カラー(ショートレングス)＋トリートメント',
    category: 'ladies',
    duration: 135,
    price: 15290,
    description:
      'ショートレングスを目安とした、カット＋カラー＋トリートメントのセットメニューです。\n\n髪の長さやデザインにより所要時間・料金が前後する場合があります。ミディアム・ロングは別メニューまたはオプションでご案内となることがあります。\n\nカラー単品と同様、シャンプーブローが別途となる場合があります。詳細は予約・来店時にご相談ください。',
  },
  {
    id: 's24-l-04',
    name: 'レディーススタンダードコース(シャンプーブローCUT＋トリートメント)',
    category: 'ladies',
    duration: 60,
    price: 9240,
    description: 'レディーススタンダードコース(シャンプーブローCUT＋トリートメント)',
  },
  {
    id: 's24-l-05',
    name: 'レディースCut  + Color ( カット+カラー ミディアム)',
    category: 'ladies',
    duration: 120,
    price: 11000,
    description: 'レディースCut  + Color ( カット+カラー ミディアム)',
  },
  {
    id: 's24-l-06',
    name: 'レディース　大人CUT',
    category: 'ladies',
    duration: 60,
    price: 4620,
    description: 'シャンプーブロー込み',
  },
  {
    id: 's24-l-07',
    name: 'レディース　大学生CUT / university student',
    category: 'ladies',
    duration: 60,
    price: 4620,
    description: 'シャンプーブロー込み',
  },
  {
    id: 's24-l-08',
    name: 'レディース　高校生CUT / high school',
    category: 'ladies',
    duration: 60,
    price: 3740,
    description: 'シャンプーブロー込み',
  },
  {
    id: 's24-l-09',
    name: 'レディース　中学生CUT / junior high school',
    category: 'ladies',
    duration: 60,
    price: 3190,
    description: 'シャンプーブロー込み',
  },
  {
    id: 's24-l-10',
    name: 'KIDS CUT 女の子',
    category: 'ladies',
    duration: 60,
    price: 2310,
    description:
      'シャンプーブロー込み\n\n美容室初めてのお子様なら\n予約の時間より早めにご来店くだされば先にキッズスペースで遊べますので\n是非遊んで頂いて場所に慣れてからカットさせていただきます。どうぞご利用下さい。',
  },
  {
    id: 's24-p-01',
    name: 'Perm パーマ (カット込み)',
    category: 'ladies',
    duration: 120,
    price: 11000,
    description: 'カット＋パーマ　シャンプーブロー込み\n※長さやスタイルで料金変わります。',
  },
  {
    id: 's24-p-03',
    name: 'サラサラ　つやつやストレートパーマ',
    category: 'ladies',
    duration: 185,
    price: 16500,
    description:
      'straight perm ストレートパーマ\n\nカット＋ストレートパーマ　シャンプーブロー込み\n長さなどにより＋1000 〜',
  },
  {
    id: 's24-l-11',
    name: "レディースお顔剃り　/ Lady's shaving",
    category: 'ladies',
    duration: 40,
    price: 3520,
    description: '女性のスタンダードタイプのお顔剃りになります。',
  },
  {
    id: 's24-l-12',
    name: "レディースフェイシャルエステ　シェービング　/ Lady's facial esthe shaving",
    category: 'ladies',
    duration: 50,
    price: 4620,
    description:
      '女性のスタンダードのお顔剃りに\nクレンジングクリームでマッサージマシンで行い\n化粧水　美容液と　保湿してぷるんぷるんに仕上げます。',
  },

  // --- メンズ ---
  {
    id: 's24-m-01',
    name: 'Pickup! メンズ プレミアムSコース (CUT＋エステシェービング＋ヘッドスパ) お土産付き',
    category: 'mens',
    duration: 105,
    price: 16390,
    tag: 'Pickup!',
    description:
      'Pickup! メンズ プレミアムコース。シャンプー・CUT、エステシェービング、ヘッドスパに加え、Caravan オールインワンクリームをお持ち帰りいただけます。',
  },
  {
    id: 's24-m-02',
    name: 'Pickup! メンズ プレミアムコース (シャンプーCUT＋エステシェービング＋ヘッドスパ)',
    category: 'mens',
    duration: 105,
    price: 12540,
    tag: 'Pickup!',
    description:
      'メンズ プレミアムコース（シャンプー・CUT、エステシェービング、眉カット、ヘッドスパ）\n通常のスタンダードコースのお顔剃りにエステがついて ヘッドスパで頭皮のケアとマッサージをしてリラックスしてもらえるコースになります。',
  },
  {
    id: 's24-m-03',
    name: 'メンズスタンダードコース (シャンプーCUT＋シェービング＋眉カット)',
    category: 'mens',
    duration: 60,
    price: 5170,
    description: 'シャンプーCUT＋シェービング＋眉カット',
  },
  {
    id: 's24-m-04',
    name: 'メンズ　大人CUT',
    category: 'mens',
    duration: 60,
    price: 4620,
    description: 'シャンプー＆ブロー込み',
  },
  {
    id: 's24-m-05',
    name: 'メンズ　大学生CUT / university student',
    category: 'mens',
    duration: 60,
    price: 4620,
    description: 'シャンプーブロー込み',
  },
  {
    id: 's24-m-06',
    name: 'メンズ　高校生CUT / high school',
    category: 'mens',
    duration: 60,
    price: 3740,
    description: 'シャンプーブロー込み',
  },
  {
    id: 's24-m-07',
    name: 'メンズ　中学生CUT / junior high school',
    category: 'mens',
    duration: 60,
    price: 3190,
    description: 'シャンプーブロー込み',
  },
  {
    id: 's24-m-08',
    name: 'KIDS CUT 男の子',
    category: 'mens',
    duration: 60,
    price: 2310,
    description:
      'シャンプーブロー込み\n\n美容室初めてのお子様なら\n予約の時間より早めにご来店くだされば先にキッズスペースで遊べますので\n是非遊んで頂いて場所に慣れてからカットさせていただきます。どうぞご利用下さい。',
  },
  {
    id: 's24-p-02',
    name: 'straight perm ストレートパーマ (カット込み)',
    category: 'mens',
    duration: 180,
    price: 14300,
    description: 'カット＋ストレートパーマ　シャンプーブロー込み\n長さなどにより＋1000 〜',
  },
  {
    id: 's24-m-09',
    name: "メンズお顔剃り　/ men's shaving",
    category: 'mens',
    duration: 15,
    price: 1650,
    description: '通常の男性のお顔剃りになります。\n通常1100円　カット＋だと　550円になります。',
  },
  {
    id: 's24-m-10',
    name: "メンズフェイシャルエステ　シェービング　/ men's facial esthe shaving",
    category: 'mens',
    duration: 40,
    price: 2750,
    description:
      '男性の方の　通常顔剃りにクレンジングクリームでのマッサージ\nと美容液と保湿がついております。\n\nお肌がツルツルぷるんぷるんに綺麗になります。',
  },

  // --- カラー・ブリーチ ---
  {
    id: 's24-c-01',
    name: 'Color  /  カラー　ショートレングス',
    category: 'color',
    duration: 75,
    price: 6050,
    description: 'ショートヘアーのカラーになります。\nシャンプーブロー代別',
  },
  {
    id: 's24-c-02',
    name: 'Color /  カラー　ミディアムレングス',
    category: 'color',
    duration: 90,
    price: 6290,
    description: 'Color /  カラー　ミディアムレングス\n肩につく長さ\n\nシャンプーブロー代別',
  },
  {
    id: 's24-c-03',
    name: 'Color /  カラー　ロングレングス',
    category: 'color',
    duration: 120,
    price: 7480,
    description: 'Color /  カラー　ロングレングス\n肩より下の長さ\n\nシャンプーブロー代別',
  },
  {
    id: 's24-c-04',
    name: 'Color ダブルカラー (ブリーチ＋カラー)',
    category: 'color',
    duration: 180,
    price: 12650,
    description:
      'ブリーチして上からもう一回カラー。\nショートの料金で目安になります\nミディアム(肩につく位置)\nロング(肩より下)\nでお値段は変わります。\n\nシャンプーブロー代別',
  },
  {
    id: 's24-c-05',
    name: 'CUT＋BLEACH＋COLOR  セットメニュー',
    category: 'color',
    duration: 180,
    price: 17050,
    description:
      'CUT＋BLEACH＋COLOR  のセットメニューです。\n\nshortでの料金目安になります。\n\nミディアム (肩につく)\nロング　(肩より下)\n\n髪の長さでカラーの料金は変わります。\n目安とお考えください。',
  },
  {
    id: 's24-c-06',
    name: 'CUT＋BLEACH＋COLOR ＋TREATMENT セットメニュー',
    category: 'color',
    duration: 210,
    price: 20350,
    description:
      'CUT＋BLEACH＋COLOR ＋TREATMENTのセットメニューになります。\n髪の長さで料金は変わります。\n目安とお考えください。',
  },
  {
    id: 's24-c-07',
    name: 'CUT＋BLEACH ×2＋COLOR  セットメニュー',
    category: 'color',
    duration: 300,
    price: 24200,
    description:
      'CUT＋BLEACH ×2＋COLOR  セットメニュー\nブリーチを2回する事で1回ブリーチでは出せない色味や\n透明感が出る施術になります。\n\n料金は長さにより変わります。\n目安とお考えください。',
  },
  {
    id: 's24-c-08',
    name: 'CUT＋BLEACH ×2＋COLOR ＋TREATMENT',
    category: 'color',
    duration: 300,
    price: 27500,
    description:
      'CUT＋BLEACH ×2＋COLOR ＋TREATMENT\n\nブリーチ2回すると多少髪にもダメージがでるので\n色もちも髪の状態も考えると　\nTREATMENTは必須になると\ntwenty fourは考えてます。',
  },

  // --- トリートメント・スパ ---
  {
    id: 's24-t-01',
    name: 'treatment トリートメント',
    category: 'treatment',
    duration: 30,
    price: 3520,
    description: 'トリートメント',
  },
  {
    id: 's24-t-02',
    name: 'treatment / アマトラトリートメント',
    category: 'treatment',
    duration: 40,
    price: 4620,
    description: 'しっとりトリートメント',
  },
  {
    id: 's24-t-03',
    name: '艶髪トリートメント',
    category: 'treatment',
    duration: 40,
    price: 7920,
    description: '髪のパサツキや広がりを抑えて内部にしっかり栄養補給\n保湿して\nしっかりサラサラツヤのしあがり。',
  },
  {
    id: 's24-t-04',
    name: 'ダメージ補修トリートメント',
    category: 'treatment',
    duration: 40,
    price: 7920,
    description:
      'カラーやブリーチ、パーマや日々のドライヤー、アイロンやコテによるダメージに\n\n内部にしっかり栄養補給して補修していくトリートメントです。',
  },
  {
    id: 's24-t-05',
    name: 'treatment / トリートメント　集中ケア',
    category: 'treatment',
    duration: 60,
    price: 6600,
    description: '髪のパサツキや広がりを抑えて内部にしっかり栄養補給\n保湿してサラツヤのしあがりに',
  },
  {
    id: 's24-t-06',
    name: 'Head spa ヘッドスパ　（20分）',
    category: 'treatment',
    duration: 30,
    price: 3520,
    description:
      'シャンプーでとれない蓄積された頭皮の油分や汚れを取り除き\nラグジュアリーなリラックスできるシャンプー台\nYUME shampooでのマッサージメニューで\n\n頭皮のたるみやお顔もリフトアップされ、極上のリラックス効果です。',
  },
  {
    id: 's24-t-07',
    name: '極上ヘッドスパ　（30分）/ high quality head spa',
    category: 'treatment',
    duration: 40,
    price: 4620,
    description:
      'ヘッドスパのハイクオリティメニューになります。\n\n通常のヘッドスパより更にクオリティの高いものを使い\nRefajヘッドマッサージマシンで頭皮をほぐしてから\n首と目の上にホットタオルで温めての\nマッサージメニューになります。',
  },
  {
    id: 's24-t-08',
    name: 'リンパマッサージ',
    category: 'treatment',
    duration: 30,
    price: 2200,
    description:
      'ヘッドスパで頭皮の疲れをとってリラックスした後\nお首・肩・肩甲骨周りのリンパ流し\nよりリラックスをさせていただきます。',
  },

  // --- その他 ---
  {
    id: 's24-o-01',
    name: 'シャンプーブロー　/ shampoo and blow',
    category: 'other',
    duration: 30,
    price: 2750,
    description:
      'シャンプーブローのみの料金です。\n通常カットには　シャンプーブローがついてますが\nカラー時は別途必要となります。',
  },
  {
    id: 's24-o-02',
    name: 'セット　アップスタイル　/ styling up style',
    category: 'other',
    duration: 30,
    price: 6600,
    description: '結婚式や二次会パーティーなどのセットです。',
  },
  {
    id: 's24-o-03',
    name: '時間外料金',
    category: 'other',
    duration: 60,
    price: 1100,
    description: '営業時間以外でのご予約の場合にかかります。\n30分ごとに＋550円\n\n電話予約のみなります。',
  },
  {
    id: 's24-o-04',
    name: '着付け　/ Kimono dressing',
    category: 'other',
    duration: 60,
    price: 11000,
    description:
      '着付け　成人式や卒業式などに　浴衣や袴も承ります。\n事前に前もっての予約と、別日のカウンセリングが必要となります。',
  },
  {
    id: 's24-o-05',
    name: '訪問カット',
    category: 'other',
    duration: 60,
    price: 4620,
    description:
      '⚪︎美容室に来店できないお客様や老人施設等への、高齢者向け理美容サービスです。\n\n⚪︎当日の流れ：店内の予約状況を確認のうえ、こちらからご連絡いたします。\n\n⚪︎注意事項：施設の状況により対応可否を事前に確認いたします。\n\n訪問場所や移動手段により料金が変更いたします。',
  },
];
