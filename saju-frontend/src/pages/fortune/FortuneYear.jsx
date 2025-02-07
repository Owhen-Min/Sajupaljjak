import { TopBar2 } from "../../components/TopBar2";
import useFetchData from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import SajuColumn from "../../components/SajuColumn";

function FortuneYear() {
  const [data, setData] = useState({
    "id": 12,
    "siju": "해",
    "ilju": "갑자",
    "characteristic": "2025년은 일주가 갑자이고 시주가 해인 사람에게 중요한 변화의 시점이 될 거야. 갑자는 나무의 힘을 상징해서 성장과 발전에 대한 욕구가 강해지고, 해는 물의 속성이어서 감정적 유동성과 창의력이 부각될 거야. 이 해에는 새로운 기회를 잡기 좋은 시점이니, 주저하지 말고 새로운 도전을 해보는 게 좋겠어. 특히 인간관계에서 좋은 인연을 만날 확률이 높아져서, 소중한 친구나 동료와 함께 성장할 수 있는 기회를 놓치지 않도록 해. 안정적인 기반 위에 변화와 성장을 이루는 한 해가 될 거야. 그렇기 때문에 긍정적인 마인드로 지내고, 주변의 지지와 조언을 적극적으로 활용하는 게 중요해.",
    "flow": "2025년 운세를 살펴보면, 전반적인 운세는 안정적이면서도 작은 변화들이 있을 거야. 특히 갑자와 해는 서로 조화를 이루는 기운이 있어서 긍정적인 흐름이 기대돼. 재물운은 특히 안정적일 거고, 소소한 수익이 있을 수 있어. 큰 투자보다는 안전한 선택이 좋겠다. 애정운은 우선 만남이 많아질 것 같아. 친구들이나 새로운 사람들과의 관계가 깊어질 가능성이 커. 단, 서운한 일이 생기지 않게 조심하는 게 좋겠어. 건강운은 대체로 무난해 보이지만, 가벼운 운동이나 규칙적인 생활로 면역력을 높이는 것이 필요해. 전반적으로 긍정적인 흐름이니 잘 활용하길 바라!",
    "danger": "2025년 유의할 점은 다음과 같아.\n\n첫째, 건강 관리. 일년 동안 에너지가 떨어질 수 있으니 규칙적인 운동과 충분한 수면이 필요해. 스트레스를 해소할 방법을 미리 찾아두는 것도 좋아.\n\n둘째, 대인관계. 소통에 신경 써야 할 시점이야. 주변 사람들과의 마찰이 생길 수 있으니, 솔직하게 이야기하고 상황을 잘 풀어나가는 게 중요해.\n\n셋째, 재정 관리. 투자나 경제적인 결정에 신중해야 해. 급한 마음에 투자하면 후회할 수 있으니 계획을 잘 세우는 것이 바람직해.\n\n마지막으로, 자기 개발. 새로운 취미나 기술을 배우는 데 시간을 투자하는 게 좋을 것 같아. 흥미를 느낄 만한 활동을 찾아서 균형 잡힌 삶을 지향해.",
    "advice": "2025년은 너에게 변화와 성장이 많은 해가 될 거야. 특히 일과 관련된 기회가 많이 찾아올 수 있으니, 적극적으로 도전해봐. 건강에도 신경 쓰고, 균형 잡힌 생활이 중요해. 주변 사람들과의 소통을 늘려서 지지와 협력을 받는 것도 잊지 말고. 어려움이 닥쳐도 긍정적으로 대처하면 좋은 결과가 따를 거야. 항상 너 자신을 믿어."
});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFortune = async () => {
      try {
        setIsLoading(true);
        const response = await useFetchData('/api/fortune/new-year', FortuneYear);
        setData(response.data);
      } catch (err) {
        console.error('연간 운세 데이터를 가져오는데 실패했습니다:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFortune();
  }, []);

  return (
    <div className="container mx-auto max-w-3xl pb-5">
      <TopBar2
        url='/fortune'
        mainText="2025년 운세"
      />
      <div className="px-4">
        <div className="mt-6 space-y-6">
          <div className="bg-white rounded-2xl py-2 p-6 text-center justify-center">
            <h2 className="text-xl font-bold text-gray-800">2025년 사주</h2>
            <div className="flex justify-center items-center">
              <SajuColumn 
                top='을'
                bottom='사'
                horizontal={true}
              />
            </div>
            <div className="text-start text-gray-600 text-[15px] leading-7">
              <ReactMarkdown>2025년은 **을목**과 **사화**의 해입니다.</ReactMarkdown>
              <ReactMarkdown>**을목**은 부드럽지만 강한 생명력을 가진 나무로, 성장과 협력, 창의성을 상징합니다.</ReactMarkdown>
              <ReactMarkdown>**사화**는 여름의 불꽃처럼 활발하고 열정적인 기운을 지니며, 기술 발전과 도전적인 분위기를 이끕니다.</ReactMarkdown>
            </div>
          </div>

          {/* 상세 운세 내용 */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ✨ 올해의 총운
              </h3>
              <div className="text-gray-600 text-[15px] leading-7">
                <ReactMarkdown>{data.characteristic}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🌊 올해의 흐름
              </h3>
              <div className="text-gray-600 text-[15px] leading-7">
                <ReactMarkdown>{data.flow}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                ⚠️ 주의사항
              </h3>
              <div className="text-gray-600 text-[15px] leading-7">
                <ReactMarkdown>{data.danger}</ReactMarkdown>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                💡 조언
              </h3>
              <div className="text-gray-600 text-[15px] leading-7">
                <ReactMarkdown>{data.advice}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FortuneYear;