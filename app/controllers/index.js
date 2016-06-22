import Ember from 'ember';

export default Ember.Controller.extend({

  // наблюдатели не реализованы, потэтому pie-chart не динамический
  data: Ember.computed('articles.@each.amountCost', function(){
    var data = [];
    var arrArt = this.store.peekAll('article').toArray();

    for(let i=0; i<arrArt.length; i++){

      if(arrArt[i].get('isRoot')){
        data.push({value: arrArt[i].get('amountCost'), label: arrArt[i].get('title')});
      }
    }
    return data;
  }),


  actions :{
      articleCreate() {
          var title = $('#inputTitle').val();
          var parent = $('#inputParent').val();

          if (title) {

            var article = this.store.createRecord('article', {
              id: title,
              title: title
            });

            if(parent){
              this.store.findRecord('article', parent).then(function(parent){
                article.set('parent', parent);
                article.save();
              });
            }else{
              article.save();
            }

          }

        $('#inputTitle').val('');
        $('#inputParent').val('');
      },

      addCost(){
        var title = $('#inputTitle2').val();
        var cost = +$('#inputCost').val();

        if (title && isFinite(cost)) {

          this.store.findRecord('article', title).then(function account(article) {
            var current_cost = +article.get('cost') + cost;
            article.set('cost', current_cost);
            article.save();
          });

          $('#inputTitle2').val('');
          $('#inputCost').val('');
        }

      },

      crFormToggle(){
            this.toggleProperty('isCrFormShowing');
      },

      costFormToggle(){
            this.toggleProperty('isCostFormShowing');
      }

   }
});
