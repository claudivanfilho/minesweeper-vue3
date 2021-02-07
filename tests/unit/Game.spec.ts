import { mount, VueWrapper } from "@vue/test-utils";

import Game from "@/components/Game.vue";
import { GameState } from "../../src/models";

describe("Test MineField", () => {
  let wrapper: VueWrapper<any>;

  beforeAll(async () => {
    wrapper = mount(Game, {});
  });

  describe("when initiated", () => {
    it("should appear the smilling block and all the blocks should be hidden", () => {
      expect(wrapper.find("#EmojiSmileIcon").exists()).toBeTruthy();
    });

    it("should does not exists a visible block", () => {
      expect(wrapper.find(".block--visible").exists()).toBeFalsy();
    });

    describe("when a block is clicked", () => {
      beforeAll(async () => {
        wrapper.find(".block--hidden").trigger("click");
        await wrapper.vm.$nextTick();
      });
      it("should exists a visible block", () => {
        expect(wrapper.find(".block--visible").exists()).toBeTruthy();
      });
    });

    it("should not appear a sad emoji on emoji block", () => {
      expect(wrapper.find("#EmojiSadIcon").exists()).toBeFalsy();
    });

    it("should not appear a sunglasses emoji on emoji block", () => {
      expect(wrapper.find("#EmojiSunglassesIcon").exists()).toBeFalsy();
    });

    describe("when i loose the game", () => {
      beforeAll(async () => {
        wrapper = mount(Game, {});
        wrapper.vm.gameState = GameState.LOST;
        await wrapper.vm.$nextTick();
      });
      it("should appear a sad emoji on emoji block", () => {
        expect(wrapper.find("#EmojiSadIcon").exists()).toBeTruthy();
      });
    });

    describe("when the game is completed", () => {
      beforeAll(async () => {
        wrapper = mount(Game, {});
        wrapper.vm.gameState = GameState.COMPLETED;
        await wrapper.vm.$nextTick();
      });
      it("should appear a sunglasses emoji on emoji block", () => {
        expect(wrapper.find("#EmojiSunglassesIcon").exists()).toBeTruthy();
      });
    });
  });
});
