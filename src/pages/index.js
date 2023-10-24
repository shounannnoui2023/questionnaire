import { useForm, Controller } from "react-hook-form";
//yarn add @material-ui/core でコンテンツの表示領域と余白を調整
import Container from "@material-ui/core/Container";
//名前の入力欄をMaterial-uiのText Inputに置換える ※そのまま使用するとreacthookの機能が使えなくなる
import Input from "@material-ui/core/Input";

export default function Home() {
  //useFormを実行しregister,handleSubmitを取得
  //formState:{errors}でエラーの有無によってメッセージを発生させる
  //useFormとControllerを紐付ける為にcontrolをuseFormより取得、Materialのinputに置き換え
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const learningValues = watch(["isLearning", "wasLearning"]);
  console.log(typeof learningValues[0]);

  const isLearning = learningValues[0];
  const wasLearning = learningValues[1];

  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください(匿名可)。</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
              // {...register("name")}
            />
          </div>
          <div>
            <label htmlFor="birth">
              Q2. 生年月日を入力してください。(例:19900101)
            </label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /[0-9]{8}$/ }}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
            {errors.birth && errors.birth.type === "required" ? (
              <span>このフィールドは回答必須です。</span>
            ) : null}
            {errors.birth && errors.birth.type === "pattern" ? (
              <span>整数8桁で入力してください。</span>
            ) : null}
          </div>
          <div>
            <span>Q3. 現在、プログラミングを学習していますか？</span>
            <input
              id="isLearning1"
              {...register("isLearning", { required: true })}
              name="isLearning"
              type="radio"
              value="true"
            />
            <label htmlFor="isLearning1">はい</label>
            <input
              id="isLearning2"
              {...register("isLearning", { required: true })}
              name="isLearning"
              type="radio"
              value="false"
            />
            <label htmlFor="isLearning2">いいえ</label>

            {errors.isLearning && <span>このフィールドは回答必須です。</span>}
          </div>
          <div>
            <span>
              Q4. これまでに、プログラミングを学習したことがありますか？
            </span>
            <input
              id="wasLearning1"
              {...register("wasLearning", { required: true })}
              name="wasLearning"
              type="radio"
              value="true"
            />
            <label htmlFor="wasLearning1">はい</label>
            <input
              id="wasLearning2"
              {...register("wasLearning", { required: true })}
              name="wasLearning"
              type="radio"
              value="false"
            />
            <label htmlFor="wasLearning2">いいえ</label>
            {errors.wasLearning && <span>このフィールドは回答必須です。</span>}
          </div>

          {(isLearning === "true" || wasLearning === "true") && (
            <div>
              <label htmlFor="name">
                Q5.今まで学習したことのあるプログラミング言語をすべて教えてください。
              </label>
              <Controller
                name="name"
                defaultValue=""
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input value={value} onChange={onChange} />
                )}
              />
            </div>
          )}
          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container>
    </>
  );
}

//Q17の名前・生年月日をMaterial UI inputに置換える意味　...register無くなっていいのか
//Q19 はいの場合の実装
//Q20 firestoreを導入しDBに記録
