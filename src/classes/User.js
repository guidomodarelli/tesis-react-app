import validator from 'validator';

class User {
  /**
   *
   * @param {Record<string, {
   *  id: string,
   *  email: string,
   *  name: string,
   *  birthdate: string,
   *  bio?: string,
   *  instagram?: string,
   *  role: 'admin' | 'normal',
   *  addGroup: boolean,
   *  addNewAdmins: boolean,
   *  changeGroupInfo: boolean,
   *  changeGroupUser: boolean,
   *  changePermissionsAdmins: boolean,
   *  changeRoutine: boolean,
   *  deletePosts: boolean,
   *  deleteUsers: boolean,
   *  deleteVotes: boolean
   * }>} user
   */
  constructor(user = {}) {
    this.setId(user.id);
    this.setEmail(user.email);
    this.setName(user.name);
    this.setBirthdate(user.birthdate);
    this.setBio(user.bio);
    this.setInstagram(user.instagram);
    this.setRole(user.role);
    this.setAddGroup(user.addGroup);
    this.setAddNewAdmins(user.addNewAdmins);
    this.setChangeGroupInfo(user.changeGroupInfo);
    this.setChangeGroupUser(user.changeGroupUser);
    this.setChangePermissionsAdmins(user.changePermissionsAdmins);
    this.setChangeRoutine(user.changeRoutine);
    this.setDeletePosts(user.deletePosts);
    this.setDeleteUsers(user.deleteUsers);
    this.setDeleteVotes(user.deleteVotes);
  }

  /**
   *
   * @param {any} value
   * @param {string} field
   */
  hasValue(value, field) {
    if (!value) {
      throw new Error(`${field} esta indefinido`);
    }
  }

  /**
   *
   * @param {string} id
   */
  setId(id) {
    if (id && typeof id === 'string') {
      if (!validator.isUUID(id, 4)) {
        throw new Error('El id debe ser un UUIDv4');
      }
    }
    this.id = id;
  }

  /**
   *
   * @param {string} email
   */
  setEmail(email) {
    this.hasValue(email, 'email');
    if (!validator.isEmail(email)) {
      throw new Error('email no es válido');
    }
    this.email = email;
  }

  /**
   *
   * @param {string} name
   */
  setName(name) {
    this.hasValue(name, 'name');
    this.name = name;
  }

  /**
   *
   * @param {string} birthdate
   */
  setBirthdate(birthdate) {
    this.hasValue(birthdate, 'birthdate');
    if (!validator.isDate(birthdate)) {
      throw new Error('birthdate no es válido');
    }
    this.birthdate = birthdate;
  }

  /**
   *
   * @param {string?} bio
   */
  setBio(bio = null) {
    if (bio && typeof bio !== 'string') {
      throw new Error('bio no es de tipo string');
    }
    this.bio = bio;
  }

  /**
   *
   * @param {string?} instagram
   */
  setInstagram(instagram = null) {
    if (instagram && typeof instagram !== 'string') {
      throw new Error('instagram no es de tipo string');
    }
    this.instagram = instagram;
  }

  /**
   *
   * @param {'admin' | 'normal'} role
   * @default
   */
  setRole(role = 'normal') {
    this.hasValue(role, 'role');
    const allowedValues = ['admin', 'normal'];
    if (!validator.isIn(role, allowedValues)) {
      throw new Error(
        `El rol debe ser ${Object.values(allowedValues).join(' o ')}`,
      );
    }
    this.role = role;
  }

  /**
   *
   * @param {boolean} value
   */
  setAddGroup(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.addGroup = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setAddNewAdmins(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.addNewAdmins = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setChangeGroupInfo(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.changeGroupInfo = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setChangeGroupUser(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.changeGroupUser = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setChangePermissionsAdmins(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.changePermissionsAdmins = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setChangeRoutine(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.changeRoutine = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setDeletePosts(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.deletePosts = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setDeleteUsers(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.deleteUsers = value;
  }

  /**
   *
   * @param {boolean} value
   */
  setDeleteVotes(value = false) {
    if (typeof value !== 'boolean') {
      throw new Error('el valor no es de tipo boolean');
    }
    this.deleteVotes = value;
  }
}

export default User;
