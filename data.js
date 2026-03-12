// Mock Database for the Advanced SPA

// Mock Database for the Advanced SPA with i18n support

const db = {
    // Translation dictionary for static UI texts
    i18n: {
        en: {
            appSubtitle: "Protocol",
            navPlan: "Plan & Protocol",
            navStories: "Success Stories",
            navMindset: "Mindset Clinic",
            navCommunity: "Community",
            userGuest: "Guest User",
            userStatus: "Ready to transform",
            goalSetup: "Goal Setup",
            goalQuestion: "How much weight do you want to lose?",
            targetRange: "Target Range",
            mildTarget: "Mild",
            intenseTarget: "Intense",
            daysProtocol: "30 Days Protocol",
            loading: "Loading...",
            targetCal: "Target",
            breakfast: "Breakfast",
            lunch: "Lunch",
            dinner: "Dinner",
            snack: "Snack",
            todaysWorkout: "Today's Workout",
            expertTip: "Expert Tip",
            hallOfFame: "Hall of Fame",
            storiesTitle: "Success Stories",
            storiesDesc: "Real people, absolute dedication, and beautiful transformations. Proof that this protocol works.",
            mentalRecovery: "Mental Recovery",
            mindsetClinic: "Mindset Clinic",
            mindsetDesc: "Weight loss is 80% mental. Find your focus here.",
            urbanSocial: "Urban Social",
            communityFeed: "Community Feed",
            postUpdate: "Post Update",
            sharePlaceholder: "Share your daily check-in, diet photo, or workout routine...",
            cancel: "Cancel",
            sharePost: "Share Post",
            repliesText: "Replies",
            shareAction: "Share",
            successToast: "Action successful"
        },
        ko: {
            appSubtitle: "프로토콜",
            navPlan: "플랜 & 프로토콜",
            navStories: "성공 사례",
            navMindset: "마인드셋 클리닉",
            navCommunity: "커뮤니티",
            userGuest: "게스트 사용자",
            userStatus: "변화할 준비 완료",
            goalSetup: "목표 설정",
            goalQuestion: "얼마나 감량하고 싶으신가요?",
            targetRange: "목표 범위",
            mildTarget: "가벼운",
            intenseTarget: "강력한",
            daysProtocol: "30일 프로토콜",
            loading: "로딩 중...",
            targetCal: "목표 칼로리",
            breakfast: "아침",
            lunch: "점심",
            dinner: "저녁",
            snack: "간식",
            todaysWorkout: "오늘의 운동",
            expertTip: "전문가 팁",
            hallOfFame: "명예의 전당",
            storiesTitle: "성공 사례",
            storiesDesc: "실제 사람들의 절대적인 헌신과 아름다운 변화. 이 프로토콜이 효과가 있다는 증거입니다.",
            mentalRecovery: "멘탈 회복",
            mindsetClinic: "마인드셋 클리닉",
            mindsetDesc: "체중 감량은 80%가 멘탈입니다. 여기서 집중력을 찾으세요.",
            urbanSocial: "어반 소셜",
            communityFeed: "커뮤니티 피드",
            postUpdate: "포스트 작성",
            sharePlaceholder: "오늘의 체크인, 식단 사진, 또는 운동 루틴을 공유해보세요...",
            cancel: "취소",
            sharePost: "포스트 공유",
            repliesText: "답글",
            shareAction: "공유하기",
            successToast: "성공적으로 처리되었습니다"
        }
    },

    // Strategy logic based on target weight loss
    getPlanStrategy(targetKg) {
        if (targetKg <= 4) {
            return {
                tier: { en: "Mild Protocol", ko: "마일드 프로토콜" },
                cal: 1400,
                carbType: { en: "Complex Carbs (Brown rice, Sweet potatoes)", ko: "복합 탄수화물 (현미, 고구마)" },
                workout: { en: "Moderate Cardio 30m + Stretching", ko: "가벼운 유산소 30분 + 스트레칭" }
            };
        } else if (targetKg <= 8) {
            return {
                tier: { en: "Standard Protocol", ko: "스탠다드 프로토콜" },
                cal: 1100,
                carbType: { en: "Low Carb (Oatmeal, Only Vegetables)", ko: "저탄수화물 (오트밀, 채소 위주)" },
                workout: { en: "HIIT 20m + Weight Training 40m", ko: "고강도 인터벌(HIIT) 20분 + 웨이트 트레이닝 40분" }
            };
        } else {
            return {
                tier: { en: "Intense Protocol (Ketogenic focus)", ko: "인텐스 프로토콜 (키토제닉 집중)" },
                cal: 900,
                carbType: { en: "Strict Keto (No direct carbs, high healthy fats)", ko: "엄격한 키토 (직접적인 탄수화물 제한, 건강한 지방 위주)" },
                workout: { en: "Fasted Cardio 40m + Intense Weight Training 50m", ko: "공복 유산소 40분 + 고강도 웨이트 트레이닝 50분" }
            };
        }
    },

    // Generates a 30-day plan dynamically based on the strategy
    generatePlans(targetKg) {
        const strategy = this.getPlanStrategy(targetKg);
        const plans = [];

        for (let i = 1; i <= 30; i++) {
            let title = { en: "", ko: "" };
            let breakfast = { en: "", ko: "" };
            let lunch = { en: "", ko: "" };
            let dinner = { en: "", ko: "" };
            let snack = { en: "", ko: "" };
            let workout = strategy.workout;
            let tip = { en: "", ko: "" };

            // Dynamic logic to simulate varied meals
            if (i === 1) {
                title.en = "Initiation Phase"; title.ko = "도입 단계";
                tip.en = `Starting strong. Your target requires a ${strategy.cal} kcal baseline. Focus on hydration.`;
                tip.ko = `강력한 시작. 목표 달성을 위해 ${strategy.cal} kcal 기준이 필요합니다. 수분 섭취에 집중하세요.`;
            } else if (i % 7 === 0) {
                title.en = "Metabolic Reset (Refeed)"; title.ko = "신진대사 리셋 (리피드)";
                tip.en = "A slight increase in clean calories to prevent metabolic slowdown.";
                tip.ko = "대사 저하를 막기 위해 깨끗한 칼로리를 약간 섭취합니다.";
                workout = { en: "Rest / Light Walking 10k steps", ko: "휴식 / 가볍게 1만보 걷기" };
            } else if (i === 15) {
                title.en = "Midpoint Assessment"; title.ko = "중간 점검";
                tip.en = "You're halfway there. Re-evaluate your energy levels.";
                tip.ko = "벌써 절반을 왔습니다. 에너지 수준을 다시 평가해보세요.";
            } else if (i === 30) {
                title.en = "Final Push Protocol"; title.ko = "마지막 스퍼트 프로토콜";
                tip.en = "The last day of this cycle. Maintain the discipline.";
                tip.ko = "이번 사이클의 마지막 날입니다. 규율을 유지하세요.";
            } else {
                title.en = `Phase 0${Math.ceil(i/7)} - Day ${i}`; title.ko = `페이즈 0${Math.ceil(i/7)} - ${i}일차`;
                tip.en = "Consistency over intensity. Stick to the macros.";
                tip.ko = "강도보다 일관성입니다. 매크로 식단을 지키세요.";
            }

            // Meal logic based on intensity
            if (strategy.cal === 1400) {
                breakfast.en = "Oatmeal with berries, 2 Boiled Eggs"; breakfast.ko = "베리가 들어간 오트밀, 삶은 달걀 2개";
                lunch.en = "Chicken Salad with Balsamic, Brown Rice 1/2"; lunch.ko = "발사믹 소스를 곁들인 치킨 샐러드, 현미밥 1/2 공기";
                dinner.en = "Grilled Salmon, Asparagus"; dinner.ko = "연어 구이, 아스파라거스";
                snack.en = "Almonds 15, Greek Yogurt"; snack.ko = "아몬드 15알, 그릭 요거트";
            } else if (strategy.cal === 1100) {
                breakfast.en = "Black Coffee, 1 Apple, 2 Eggs"; breakfast.ko = "블랙 커피, 사과 1개, 달걀 2개";
                lunch.en = "Chicken Breast 150g, Massive Green Salad"; lunch.ko = "닭가슴살 150g, 대용량 그린 샐러드";
                dinner.en = "Steamed Tofu, Spinach"; dinner.ko = "찐 두부, 시금치 나물";
                snack.en = "Walnuts, Zero Sugar Soy Milk"; snack.ko = "호두, 무가당 두유";
            } else {
                breakfast.en = "Bulletproof Coffee (MCT Oil, Butter)"; breakfast.ko = "방탄 커피 (MCT 오일, 버터)";
                lunch.en = "Ribeye Steak 150g, Avocado, Leafy Greens"; lunch.ko = "립아이 스테이크 150g, 아보카도, 잎채소";
                dinner.en = "Salmon Sashimi, Olive Oil Salad"; dinner.ko = "연어 회, 올리브 오일 샐러드";
                snack.en = "Macadamia Nuts, Sparkling Water"; snack.ko = "마카다미아 너츠, 탄산수";
            }

            plans.push({
                day: i,
                title,
                calories: `approx. ${strategy.cal + (i%7===0 ? +200 : 0)} kcal`,
                breakfast,
                lunch,
                dinner,
                snack,
                workout,
                tip
            });
        }
        return { strategy, plans };
    },

    stories: [
        {
            id: 1,
            name: { en: "Alexander K.", ko: "알렉산더 K." },
            target: "-8kg",
            duration: { en: "2 Months", ko: "2개월" },
            text: { 
                en: "The aesthetic, the dark mode, the strict protocol. It felt less like a 'diet' and more like a systemic upgrade of my lifestyle. I lost 8kg and gained unparalleled mental clarity.",
                ko: "미적인 디자인, 다크 모드, 엄격한 프로토콜. '다이어트'라기보다는 제 라이프스타일의 체계적인 업그레이드처럼 느껴졌습니다. 8kg을 감량했고 비교할 수 없는 정신적 맑음을 얻었습니다." 
            },
            avatar: "bg-blue-900"
        },
        {
            id: 2,
            name: { en: "Sophie M.", ko: "소피 M." },
            target: "-5kg",
            duration: { en: "1 Month", ko: "1개월" },
            text: { 
                en: "This app broke everything down elegantly. I didn't have to think; I just followed the daily instructions. The Mindset Clinic literally saved me on Day 14 when I wanted to quit.",
                ko: "이 앱은 모든 것을 우아하게 세분화해줍니다. 생각할 필요 없이 매일의 지침을 따르기만 하면 됐습니다. 포기하고 싶었던 14일째에 마인드셋 클리닉이 정말 저를 구했습니다." 
            },
            avatar: "bg-purple-900"
        },
        {
            id: 3,
            name: { en: "David Park", ko: "데이빗 박" },
            target: "-12kg",
            duration: { en: "3 Months", ko: "3개월" },
            text: { 
                en: "Switched to the Intense Protocol. Ketosis hits hard but the fat melted off. The community feed kept me accountable. Highly recommend snapping daily photos.",
                ko: "인텐스 프로토콜로 전환했습니다. 키토시스 상태가 힘들긴 했지만 지방이 녹아내렸습니다. 커뮤니티 피드 덕분에 책임감을 가질 수 있었습니다. 매일 사진을 찍는 것을 강력히 추천합니다." 
            },
            avatar: "bg-emerald-900"
        }
    ],

    mindset: [
        {
            title: { en: "The Scale is a Liar", ko: "체중계는 거짓말쟁이입니다" },
            content: { 
                en: "Water retention, glycogen stores, and digestive transit all affect the scale. If you stuck to the protocol yesterday, you are losing fat. Do not let a number manipulate your emotional state. Keep pushing.",
                ko: "수분 저류, 글리코겐 저장, 소화 과정 모두 체중계 수치에 영향을 미칩니다. 어제 프로토콜을 잘 지켰다면 당신은 지방을 잃고 있는 것입니다. 숫자가 당신의 감정 상태를 조종하게 두지 마세요. 계속 밀어붙이세요."
            }
        },
        {
            title: { en: "Embrace the Hunger", ko: "배고픔을 받아들이세요" },
            content: { 
                en: "Hunger is not an emergency. It is a biological signal that your body is searching for energy. If you don't feed it immediately, it will feed on your stored fat. Smile at the hunger. It means it's working.",
                ko: "배고픔은 비상 상황이 아닙니다. 몸이 에너지를 찾고 있다는 생물학적 신호일 뿐입니다. 즉시 음식을 공급하지 않으면, 몸은 저장된 지방을 연료로 사용할 것입니다. 배고픔에 미소 지으세요. 제대로 작동하고 있다는 뜻이니까요."
            }
        },
        {
            title: { en: "The 1% Override", ko: "1%의 초과 달성" },
            content: { 
                en: "When you feel like giving up, your brain is lying to you to conserve comfort. You have vastly more reserves than you think. Tell yourself: 'I will just do 1% more.' Delay the cheat meal by just one hour. Then another.",
                ko: "포기하고 싶을 때, 우리의 뇌는 편안함을 유지하기 위해 우리에게 거짓말을 합니다. 당신은 생각보다 훨씬 더 많은 에너지를 가지고 있습니다. 스스로에게 말하세요: '딱 1%만 더 하자.' 치팅 밀을 단 한 시간만 미루세요. 그리고 한 시간 더."
            }
        },
        {
            title: { en: "Action Precedes Motivation", ko: "행동이 동기를 선행합니다" },
            content: { 
                en: "You will not feel motivated to go to the gym today. Do not wait for motivation. Put on your shoes. Walk out the door. The motivation arrives 10 minutes into the workout.",
                ko: "오늘은 헬스장에 가고 싶은 동기가 느껴지지 않을 것입니다. 동기를 기다리지 마세요. 신발을 신으세요. 문 밖으로 나가세요. 동기는 운동을 시작하고 10분 뒤에 찾아옵니다."
            }
        }
    ],

    communityFeeds: [
        {
            id: 101,
            user: "Sarah88",
            time: { en: "2 hours ago", ko: "2시간 전" },
            content: { 
                en: "Day 12 of the standard protocol. Finally broke through the plateau! Here is my meal prep for the week. Clean eating is becoming a habit.",
                ko: "스탠다드 프로토콜 12일차. 드디어 정체기를 돌파했습니다! 이번 주 식단 준비 사진입니다. 클린 이팅이 습관이 되어가네요."
            },
            media: "none",
            type: "none",
            likes: 24,
            replies: 5
        },
        {
            id: 102,
            user: "IronMike",
            time: { en: "5 hours ago", ko: "5시간 전" },
            content: { 
                en: "Just finished the HIIT session. Completely destroyed but feeling alive. Stay hard, everyone. 🦾",
                ko: "방금 HIIT 세션을 마쳤습니다. 완전히 지쳤지만 살아있음을 느낍니다. 다들 힘내세요. 🦾"
            },
            media: "none",
            type: "none",
            likes: 56,
            replies: 8
        }
    ]
};

window.db = db;
