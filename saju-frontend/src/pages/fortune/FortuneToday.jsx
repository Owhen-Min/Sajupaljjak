import { TopBar2 } from "../../components/TopBar2";
import { get } from "../../api/apiService";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

function FortuneToday() {
  const [data, setData] = useState({
	  "totalScore" : 60,
	  "wealthScore" : 100,
	  "healthScore" : 40,
	  "loveScore" : 10,
	  "studyScore" : 60,
	  "content" : 
	  {
		  "total" : "매사에 조심 또 조심하는 것이 좋습니다. 오늘은 그저 근신하듯 생활반경 안에서 생활해야 합니다. 일상적으로 다니는 곳에서 벗어난다면 작은 사고가 일어나게 됩니 다. 여행을 하실 분은 오늘은 피하는 것이 좋겠고 피치 못하게 꼭 가야하는 상황이면 되도록 대중교통을 이용 하시기 바랍니다. 전체적으로 볼 때 당신의 오늘 운세는 이제 막 우물 밖을 벗어난 개구리에 비교될 수 있습니 다. 특히 대인관계에서 상대방을 헐뜯게 되는 실수를 함으로써 문제가 커질 수도 있습니다. 경거망동을 삼가하고 알게 된지 얼마 안된 사람과는 어느 정도의 거리를 두도록 하세요.",
		  "wealth" : "어둠이 거치고 햇살이 드는 형국입니다. 어려움에도 불구하고 인내하고 지내온 덕분에 금전적으로 많은 이득이 생길 것입니다. 물론 기대한 것보다는 작을 수 있으나 이는 자신의 그릇 때문이라 여기는 것이 어떨까 합니다.",
		  "love" : "서두르지 말고 편안한 마음을 지녀야 합니다. 만일 조급하게 행동한다면 상대는 당신을 다시 보게 될 것이고 마이너스 효과만 가져올 것입니다. 지금 상대가 바라는 것은 뭔가 여유로운 모습이라고 볼 수 있습니다.",
		  "health" : "외부 환경 자극에 민감한 때입니다. 따라서 여느 때보다 철저한 몸 관리로 사전 예방이 필요합니다. 만약 건강관리가 소홀해지게 되면 지병이 재발되거나 합병증으로 고생할 수 있으며 쉽게 완치가 되기 어려우니 주의를 요합니다.",
		  "study" : "마음이 안정되면서 좋은 성과가 예상됩니다.이전까지 노력을 했는데 좋은 결과가 생기지 않았다면 지금의 순간을 위한 것이라 여겨도 좋습니다. 이전의 노력을 어느 정도 보상받으며 보다 더 의욕도 생길 것입니다."
		}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchFortune = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await get('/fortune/today');
  //       setData(response.data);
  //     } catch (err) {
  //       console.error('운세 데이터를 가져오는데 실패했습니다:', err);
  //       setError(err);
  //       // 오류 발생시 샘플 데이터 사용
  //       setData(sampleResponse);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchFortune();
  // }, []);

  // if (isLoading) return <div>로딩중...</div>;
  // if (error) console.log('에러가 발생했습니다. 샘플 데이터를 표시합니다.');

  return (
    <div className="container mx-auto max-w-3xl pb-5">
      <TopBar2
        url = '/fortune'
        mainText="오늘의 운세"
      />
      <div className="px-4">
      {data && (
        <div className="mt-6 space-y-6">
          {/* 점수 개요 섹션 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            {/* 총운 점수 */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">총운</h2>
              <div className="text-3xl font-bold text-blue-600 mt-2">
                {data.totalScore}점
              </div>
            </div>

            {/* 세부 점수 그리드 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="text-gray-700 font-semibold">재물운</h3>
                <div className="text-2xl font-bold text-blue-500 mt-1">
                  {data.wealthScore}점
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="text-gray-700 font-semibold">건강운</h3>
                <div className="text-2xl font-bold text-blue-500 mt-1">
                  {data.healthScore}점
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="text-gray-700 font-semibold">애정운</h3>
                <div className="text-2xl font-bold text-blue-500 mt-1">
                  {data.loveScore}점
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="text-gray-700 font-semibold">학업운</h3>
                <div className="text-2xl font-bold text-blue-500 mt-1">
                  {data.studyScore}점
                </div>
              </div>
            </div>
          </div>

          {/* 상세 운세 내용 */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🌟 총운
              </h3>
              <div className="text-gray-600 text-[15px] leading-relaxed leading-loose">
                <ReactMarkdown>{data.content.total}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                💰 재물운
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed leading-loose">
                <ReactMarkdown>{data.content.wealth}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ❤️ 애정운
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed leading-loose">
                <ReactMarkdown>{data.content.love}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🏥 건강운
              </h3>
              <div className="text-gray-600 text-sm leading-relaxed leading-loose">
                <ReactMarkdown>{data.content.health}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                📚 학업운
              </h3>
              <div className="text-gray-600 leading-relaxed leading-loose">
                <ReactMarkdown>{data.content.study}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default FortuneToday;