import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  //origFn.call(browser.driver.controlFlow(), function () {
  //  return protractor.promise.delayed(100);
  //});

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Owner attribute ', () => {
    page.navigateTo();
    expect(page.getUserTitle()).toEqual('Todos');
  });

  it('should type something in filter owner box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAOwner("d");
    expect(page.getUniqueTodo("homework")).toEqual("Dawn");
    page.backspace();
    page.typeAOwner("f")
    expect(page.getUniqueTodo("video games")).toEqual("Fry");
  });

  it('should type something in filter category box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeACategory("video");
    expect(page.getUniqueTodo("video games")).toEqual("Fry");
    page.repeatBackspace(5);
    page.typeACategory("homework")
    expect(page.getUniqueTodo("homework")).toEqual("Fry");
  });

  it('should type something in filter body box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeABody("occaecat");
    expect(page.getUniqueTodo("homework")).toEqual("Fry");
    page.repeatBackspace(8);
    page.typeABody("Lorem consectetur")
    expect(page.getUniqueTodo("software design")).toEqual("Blanche");
  });

  it('should type something in filter status box and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAStatus("complete");
    expect(page.getUniqueTodo("homework")).toEqual("Fry");
    page.repeatBackspace(8);
    page.typeAStatus("incomplete")
    expect(page.getUniqueTodo("software design")).toEqual("Blanche");
  });
/*
  it('should type something in filter by owner box, filter by status box, filter by body box, and filter by category and check that it returned correct element', () => {
    page.navigateTo();
    page.typeAOwner("Fry");
    expect(page.getUniqueTodo("video games")).toEqual("Fry");
    page.typeAStatus("incomplete")
    expect(page.getUniqueTodo("video games")).toEqual("Fry");
    page.typeABody("v");
    expect(page.getUniqueTodo("video games")).toEqual("Fry");
    page.typeACategory("v");
    expect(page.getUniqueTodo("video games")).toEqual("Fry");

  });
*/

});
