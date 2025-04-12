import moment from "moment";

export class IdeaService {
  ideas: any[];
  constructor() {
    this.ideas = [];
  }

  async find() {
    return this.ideas;
  }

  async create(data: any) {
    try {
      const newIdea = {
        id: this.ideas.length + 1,
        text: data.text,
        tech: data.tech,
        viewer: data.viewer,
        time: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      this.ideas.push(newIdea);
      console.log("newIdea", newIdea);
      return newIdea;
    } catch (error) {
      console.log(error);
    }
  }
}
