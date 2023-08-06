
// 기본정보
const userName = '현재연' // 본인 이름/닉네임
const githubUserName = 'jyhyun1008' // 깃허브 아이디
const githubRepoName = 'multiportfolio' // 깃허브 레포지토리 이름

// 외형
const isDarkMode = true // 다크모드

const accent = '#ff9899' // 주요 컬러
const grad = '#fde5b4' // 그라데이션 컬러
const titleEmoji = '🍑' // 제목 옆에 붙을 에모지
const lineBreak = '✦' // 구분선

// 카테고리
const categories = [{
    title: '그림',
    url: 'paint',
    children: [{
        title: '내가 인하지 못한 게 신경쓰이기 시작했다',
        url: 'yjbr',
        description: '공자와 제자들의 즐거운 일상'
    }, {
        title: '한국어권 연합우주',
        url: 'ynabz',
        description: '취미로 한국어권 연합우주 캐릭터들을 낙서합니다'
    }]
}, {
    title: '음악',
    url: 'music',
    children: [{
        title: '현가지성',
        url: 'hgjs',
        description: '설명'
    }, {
        title: '재연',
        url: 'jymusic',
        description: '설명'
    }]
}, {
    title: '개발',
    url: 'dev',
    children: [{
        title: '피치타르트',
        url: 'peachtart',
        description: '페디버스 / 연합우주 상의 개인 인스턴스 및 이에 연결된 포트폴리오 사이트 입니다.'
    }, {
        title: '파이스크립트',
        url: 'piscript',
        description: 'Misskey의 플레이 생활을 보다 즐기기 위한 확장판 스크립트'
    }, {
        title: '파이',
        url: 'pi',
        description: '정적 페이지의 브라우저에서 동작하는 간단한 GPT 챗봇'
    }, {
        title: '피치타룸',
        url: 'peachtaroom',
        description: 'AiScript로 구현한 미스키 인스턴스 틈새의 작은 방'
    }, {
        title: '파이창',
        url: 'pychang',
        description: 'Pix2Pix를 사용한 인공지능 음성합성엔진'
    }, {
        title: '코코아츠',
        url: 'cocoartz',
        description: '여기에 모여라! 동글동글 힐링 메타버스 플랫폼 "코코아츠”'
    }]
}, {
    title: '폰트',
    url: 'font',
    children: [{
        title: '온글잎 코코 시리즈',
        url: 'ownglyph',
        description: '7월 23일까지 온글잎으로 제작했던 글꼴들의 백업 다운로드 저장소'
    }]
}, {
    title: '캐드',
    url: 'cad',
    children: [{
        title: '고덕국제클리닉',
        url: 'gic',
        description: '설명'
    }]
}]