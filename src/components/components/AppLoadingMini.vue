<template>
    <div class="loading_parent">
        <div class="loadingio-spinner-ellipsis-zo7igqbsgm">
            <div class="ldio-hw82xsxdpl">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppLoadingMini",
    }
</script>
<style>
    .loading_parent {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    @keyframes ldio-hw82xsxdpl {
        0% {
            transform: translate(12px, 80px) scale(0);
        }
        25% {
            transform: translate(12px, 80px) scale(0);
        }
        50% {
            transform: translate(12px, 80px) scale(1);
        }
        75% {
            transform: translate(80px, 80px) scale(1);
        }
        100% {
            transform: translate(148px, 80px) scale(1);
        }
    }

    @keyframes ldio-hw82xsxdpl-r {
        0% {
            transform: translate(148px, 80px) scale(1);
        }
        100% {
            transform: translate(148px, 80px) scale(0);
        }
    }

    @keyframes ldio-hw82xsxdpl-c {
        0% {
            background: #93dbe9
        }
        25% {
            background: #3b4368
        }
        50% {
            background: #5e6fa3
        }
        75% {
            background: #689cc5
        }
        100% {
            background: #93dbe9
        }
    }

    .ldio-hw82xsxdpl div {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transform: translate(80px, 80px) scale(1);
        background: #93dbe9;
        animation: ldio-hw82xsxdpl 1s infinite cubic-bezier(0, 0.5, 0.5, 1);
    }

    .ldio-hw82xsxdpl div:nth-child(1) {
        background: #689cc5;
        transform: translate(148px, 80px) scale(1);
        animation: ldio-hw82xsxdpl-r 0.25s infinite cubic-bezier(0, 0.5, 0.5, 1), ldio-hw82xsxdpl-c 1s infinite step-start;
    }

    .ldio-hw82xsxdpl div:nth-child(2) {
        animation-delay: -0.25s;
        background: #93dbe9;
    }

    .ldio-hw82xsxdpl div:nth-child(3) {
        animation-delay: -0.5s;
        background: #689cc5;
    }

    .ldio-hw82xsxdpl div:nth-child(4) {
        animation-delay: -0.75s;
        background: #5e6fa3;
    }

    .ldio-hw82xsxdpl div:nth-child(5) {
        animation-delay: -1s;
        background: #3b4368;
    }

    .loadingio-spinner-ellipsis-zo7igqbsgm {
        width: 200px;
        height: 200px;
        display: inline-block;
        overflow: hidden;
        background: none;
    }

    .ldio-hw82xsxdpl {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0; /* see note above */
    }

    .ldio-hw82xsxdpl div {
        box-sizing: content-box;
    }

</style>